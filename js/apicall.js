export async function fetchPosts() {
  const apiBase = "https://knirkefridesign.no";
  const blogBase = "/blogtroll";
  const wpBase = "/wp-json/wp/v2";
  const postBase = "/posts";

  const fullPostURL = apiBase + blogBase + wpBase + postBase;

  const response = await fetch(fullPostURL);
  const data = await response.json();
  return data;
}

// fetch(fullPostURL)
//   .then((response) => response.json())
//   .then((data) => {
//     // manipulate the DOM to display the data
//     // for example:
//     const blogSection = document.querySelector(".blog__section");
//     data.forEach((post) => {
//       const postElement = document.createElement("div");
//       postElement.innerHTML = `
//         <h3>${post.title.rendered}</h3>
//         <p>${post.content.rendered}</p>
//       `;
//       blogSection.appendChild(postElement);
//     });
//   });
