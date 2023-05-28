const apiUrl = "https://knirkefridesign.no/blogtroll/wp-json/wp/v2/";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

if (postId) {
  fetch(`${apiUrl}posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      const headerElement = document.querySelector(".single__post--header");
      headerElement.textContent = post.title.rendered;
      const textElement = document.querySelector(".single__post--text");
      const parser = new DOMParser();
      const postContent = parser.parseFromString(
        post.content.rendered,
        "text/html"
      );
      textElement.innerHTML = postContent.body.innerHTML;
      const postImage = postContent.querySelector("img");
      if (postImage) {
        const imageElement = document.querySelector(".single__post--img");
        imageElement.src = postImage.src;
        imageElement.alt = postImage.alt;
      }
      const dateElement = document.querySelector(".single__post--date");
      dateElement.textContent = new Date(post.date).toLocaleDateString();

      const titleElement = document.querySelector("title");
      const descriptionElement = document.querySelector(
        'meta[name="description"]'
      );
      const trollName = document.querySelector("h2").textContent;

      titleElement.textContent = `${trollName}`;
      descriptionElement.setAttribute(
        "content",
        `Lær mer om ${trollName} og deres historie på vår blogg.`
      );
    });
}
