const apiUrl = "https://knirkefridesign.no/blogtroll/wp-json/wp/v2/";
const categoryName = "troll";
let postsPerSlide = window.innerWidth > 800 ? 9 : 10;
let slidesCount = 1;

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
      const allPostsContainer = document.querySelector(".allposts__container");
      allPostsContainer.innerHTML = "";
      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog__post--preview");
        postElement.setAttribute("tabindex", "0");
        postElement.addEventListener("click", () => {
          window.location.href = `post.html?id=${post.id}`;
        });
        const headerElement = document.createElement("h2");
        headerElement.classList.add("blog__preview--header");
        headerElement.textContent = post.title.rendered;
        postElement.appendChild(headerElement);

        postElement.setAttribute(
          "aria-label",
          `Lær mer om ${post.title.rendered}`
        );

        const parser = new DOMParser();
        const postContent = parser.parseFromString(
          post.content.rendered,
          "text/html"
        );
        const postImage = postContent.querySelector("img");
        if (postImage) {
          const imageElement = document.createElement("img");
          imageElement.src = postImage.src;
          imageElement.alt = postImage.alt;
          postElement.appendChild(imageElement);
        }
        const postText = postContent.body.textContent;
        const previewText = postText.split(" ").slice(0, 20).join(" ") + "...";
        const previewElement = document.createElement("p");
        previewElement.classList.add("preview__post");
        previewElement.textContent = previewText;
        postElement.appendChild(previewElement);

        allPostsContainer.appendChild(postElement);
      });

      if (posts.length < postsPerSlide * slidesCount) {
        document.querySelector(".more__blogs").style.display = "none";

        const messageElement = document.createElement("p");
        messageElement.classList.add("end__posts--message");
        messageElement.textContent =
          "Der var det slutt på troll, meld deg på under for å få varsel om nye troll!";
        allPostsContainer.appendChild(messageElement);
      }
    });
}

fetchCategory().then(fetchPosts);

document.querySelector(".more__blogs").addEventListener("click", () => {
  slidesCount++;
  fetchCategory().then(fetchPosts);
});
