var loader = document.getElementById("preloader");

window.addEventListener("load", function () {
  setTimeout(function () {
    loader.classList.add("hidden");
    setTimeout(function () {
      loader.style.display = "none";
    }, 200);
  }, 400);
});
