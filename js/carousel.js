const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

let slideWidth = slides[0].getBoundingClientRect().width;

window.addEventListener("resize", () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
});

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

const apiUrl = "https://knirkefridesign.no/blogtroll/wp-json/wp/v2/";
const categoryName = "troll";
const postsPerSlide = 4;
const slidesCount = 4;

function fetchCategory() {
  return fetch(`${apiUrl}categories?search=${categoryName}`)
    .then((response) => response.json())
    .then((categories) => {
      const category = categories.find(
        (category) => category.name.toLowerCase() === categoryName.toLowerCase()
      );
      return category ? category.id : null;
    });
}

function fetchPosts(categoryId) {
  if (!categoryId) return;

  fetch(
    `${apiUrl}posts?categories=${categoryId}&per_page=${
      postsPerSlide * slidesCount
    }`
  )
    .then((response) => response.json())
    .then((posts) => {
      const slides = document.querySelectorAll(".carousel__slide");
      posts.forEach((post, index) => {
        const slideIndex = Math.floor(index / postsPerSlide);
        const slide = slides[slideIndex];
        const header =
          slide.querySelectorAll(".carousel__header")[index % postsPerSlide];
        const image =
          slide.querySelectorAll(".carousel__image")[index % postsPerSlide];
        header.textContent = post.title.rendered;
        const parser = new DOMParser();
        const postContent = parser.parseFromString(
          post.content.rendered,
          "text/html"
        );
        const postImage = postContent.querySelector("img");
        if (postImage) {
          image.src = postImage.src;
          image.alt = postImage.alt;
        }
      });

      const cards = document.querySelectorAll(".blog__carousel");
      cards.forEach((card, index) => {
        card.addEventListener("click", () => {
          const targetPost = posts[index];
          window.location.href = `post.html?id=${targetPost.id}`;
        });
        const postTitle = posts[index].title.rendered;
        card.setAttribute("aria-label", `Lær mer om ${postTitle}`);
      });
    });
}

fetchCategory().then(fetchPosts);
