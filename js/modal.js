// var modal = document.getElementById("myModal");
// var modalImg = document.getElementById("img01");
// var span = document.getElementsByClassName("close")[0];

// var images = document.querySelectorAll(
//   ".single__post--img, .contact__image img, .about__img, .welcome__img"
// );

// images.forEach(function (img) {
//   img.onclick = function () {
//     modal.style.display = "block";
//     modalImg.src = this.src;
//     modalImg.alt = this.alt;
//   };
//   img.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       modal.style.display = "block";
//       modalImg.src = this.src;
//       modalImg.alt = this.alt;
//     }
//   });
// });

// span.onclick = function () {
//   modal.style.display = "none";
// };
// span.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     modal.style.display = "none";
//   } if (event.key === "Escape") {
//     modal.style.display = "none";
// });

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var span = document.getElementsByClassName("close")[0];

var images = document.querySelectorAll(
  ".single__post--img, .contact__image img, .about__img, .welcome__img"
);

images.forEach(function (img) {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    modalImg.alt = this.alt;
  };
  img.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      modal.style.display = "block";
      modalImg.src = this.src;
      modalImg.alt = this.alt;
    }
  });
});

span.onclick = function () {
  modal.style.display = "none";
};
span.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  if (
    !modal.contains(event.target) &&
    event.target != modal &&
    modal.style.display == "block" &&
    !Array.from(images).includes(event.target)
  ) {
    modal.style.display = "none";
  }
});
