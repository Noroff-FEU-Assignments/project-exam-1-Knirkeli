fetch("https://knirkefridesign.no/blogtroll/wp-json/wp/v2/posts/10")
  .then((response) => response.json())
  .then((post) => {
    document.querySelector(".welcome h2").textContent = post.title.rendered;

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, "text/html");

    const img = doc.querySelector("img");

    if (img) {
      const imgUrl = img.getAttribute("src");

      const imgAlt = img.getAttribute("alt");

      const imgTitle = img.getAttribute("title");

      const welcomeImg = document.querySelector(".welcome__img");
      welcomeImg.src = imgUrl;
      welcomeImg.alt = imgAlt;
    }

    const images = doc.querySelectorAll("img");
    images.forEach((img) => img.remove());
    document.querySelector(".welcome .info__section").innerHTML =
      doc.body.innerHTML;
  });
