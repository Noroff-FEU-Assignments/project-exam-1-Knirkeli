const signupEmail = document.querySelector(".sign__up #signupEmail");
const signupEmailError = document.getElementById("signupEmailError");
const signupForm = document.querySelector(".sign__up form");
const signupSuccess = document.getElementById("signupSuccess");

const validateSignupForm = () => {
  let messages = [];
  if (signupEmail.value === "" || signupEmail.value == null) {
    messages.push("Epost må fylles ut");
  } else if (signupEmail.value.includes("@") === false) {
    messages.push("Epost må inneholde @");
  }

  return messages;
};

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let messages = validateSignupForm();
  if (messages.length > 0) {
    signupEmailError.innerText = messages.join(", ");
    signupSuccess.innerText = "";
  } else {
    signupSuccess.innerText = "Takk for din påmelding!";
    signupEmail.value = "";
    signupEmailError.innerText = "";
  }
});
