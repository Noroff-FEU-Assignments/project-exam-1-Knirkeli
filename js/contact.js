const name = document.getElementById("your-name");
const contactEmail = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const form = document.getElementById("contactForm");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");
const subjectError = document.getElementById("subjectError");

const validateForm = (updateErrorMessages) => {
  let messages = [];
  if (name.value === "" || name.value == null) {
    messages.push("Navn må fylles ut");
    if (updateErrorMessages) nameError.innerText = "Navn må fylles ut";
  } else if (name.value.length < 3) {
    messages.push("Navn må være minst 3 tegn");
    if (updateErrorMessages) nameError.innerText = "Navn må være minst 3 tegn";
  } else {
    nameError.innerText = "";
  }

  if (contactEmail.value === "" || contactEmail.value == null) {
    messages.push("Epost må fylles ut");
    if (updateErrorMessages) emailError.innerText = "Epost må fylles ut";
  } else if (contactEmail.value.includes("@") === false) {
    messages.push("Epost må inneholde @");
    if (updateErrorMessages) emailError.innerText = "Epost må inneholde @";
  } else {
    emailError.innerText = "";
  }

  if (subject.value.length < 15) {
    messages.push("Emne må være minst 15 tegn");
    if (updateErrorMessages)
      subjectError.innerText = "Emne må være minst 15 tegn";
  } else {
    subjectError.innerText = "";
  }
  if (message.value.length < 10) {
    messages.push("Melding må være minst 10 tegn");
    if (updateErrorMessages)
      messageError.innerText = "Melding må være minst 10 tegn";
  } else {
    messageError.innerText = "";
  }

  return messages;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let messages = validateForm(true);
  if (messages.length > 0) {
    successMessage.innerText = "";
  } else {
    successMessage.innerText = "Takk for din tilbakemelding!";
    name.value = "";
    contactEmail.value = "";
    subject.value = "";
    message.value = "";
  }
});

name.addEventListener("input", () => validateForm(false));
contactEmail.addEventListener("input", () => validateForm(false));
subject.addEventListener("input", () => validateForm(false));
message.addEventListener("input", () => validateForm(false));

// const yourName = document.getElementById("your-name");
// const contactEmail = document.getElementById("email");
// const subject = document.getElementById("subject");
// const message = document.getElementById("message");
// const form = document.getElementById("contactForm");
// const nameError = document.getElementById("nameError");
// const emailError = document.getElementById("emailError");
// const messageError = document.getElementById("messageError");
// const successMessage = document.getElementById("successMessage");
// const subjectError = document.getElementById("subjectError");

// const validateForm = (updateErrorMessages) => {
//   let messages = [];
//   if (yourName.value === "" || yourName.value == null) {
//     messages.push("Navn må fylles ut");
//     if (updateErrorMessages) nameError.innerText = "Navn må fylles ut";
//   } else if (yourName.value.length < 3) {
//     messages.push("Navn må være minst 3 tegn");
//     if (updateErrorMessages) nameError.innerText = "Navn må være minst 3 tegn";
//   } else {
//     nameError.innerText = "";
//   }

//   if (contactEmail.value === "" || contactEmail.value == null) {
//     messages.push("Epost må fylles ut");
//     if (updateErrorMessages) emailError.innerText = "Epost må fylles ut";
//   } else if (contactEmail.value.includes("@") === false) {
//     messages.push("Epost må inneholde @");
//     if (updateErrorMessages) emailError.innerText = "Epost må inneholde @";
//   } else {
//     emailError.innerText = "";
//   }

//   if (subject.value.length < 15) {
//     messages.push("Emne må være minst 15 tegn");
//     if (updateErrorMessages)
//       subjectError.innerText = "Emne må være minst 15 tegn";
//   } else {
//     subjectError.innerText = "";
//   }
//   if (message.value.length < 10) {
//     messages.push("Melding må være minst 10 tegn");
//     if (updateErrorMessages)
//       messageError.innerText = "Melding må være minst 10 tegn";
//   } else {
//     messageError.innerText = "";
//   }

//   return messages;
// };

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let messages = validateForm(true);
//   if (messages.length > 0) {
//     successMessage.innerText = "";
//   } else {
//     // Check if all request headers are allowed
//     fetch(
//       "https://knirkefridesign.no/blogtroll/wp-json/contact-form-7/v1/contact-forms/126/feedback",
//       {
//         method: "OPTIONS",
//       }
//     )
//       .then((response) => {
//         const allowedHeaders = response.headers
//           .get("access-control-allow-headers")
//           .split(", ");
//         const requestHeaders = ["Content-Type"];
//         const missingHeaders = requestHeaders.filter(
//           (header) => !allowedHeaders.includes(header)
//         );
//         console.log(missingHeaders);
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     // Submit form data to WordPress site using Contact Form 7 REST API endpoint
//     fetch(
//       "https://knirkefridesign.no/blogtroll/wp-json/contact-form-7/v1/contact-forms/126/feedback",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           "your-name": yourName.value,
//           email: contactEmail.value,
//           subject: subject.value,
//           message: message.value,
//         }),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response
//         // ...
//       });

//     successMessage.innerText = "Takk for din tilbakemelding!";
//     yourName.value = "";
//     contactEmail.value = "";
//     subject.value = "";
//     message.value = "";
//   }
// });

// yourName.addEventListener("input", () => validateForm(false));
// contactEmail.addEventListener("input", () => validateForm(false));
// subject.addEventListener("input", () => validateForm(false));
// message.addEventListener("input", () => validateForm(false));
