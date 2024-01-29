const form = document.getElementById("myForm"),
  passwordInput = document.getElementById("password"),
  passToggleBtn = document.getElementById("pass-toggle-btn"),
  thankYouMessage = document.getElementById("thank-you-content");

const showError = (field, errorText) => {
  field.classList.add("error");
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  field.closest(".form-group").appendChild(errorElement);
};

const checkPasswordStrength = (password) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

const validatePassword = (password) => {
  if (password === "") {
    showError(passwordInput, "Enter your password");
  } else if (!checkPasswordStrength(password)) {
    showError(
      passwordInput,
      "Please enter at least 8 characters with a number, symbol, lowercase and uppercase letter."
    );
  }
};

const handleFormData = (e) => {
  e.preventDefault();
  const [fullnameInput, emailInput, dateInput, genderInput] = [
    "fullname",
    "email",
    "date",
    "gender"
  ].map((id) => document.getElementById(id));

  const [fullname, email, password, date, gender] = [
    fullnameInput,
    emailInput,
    passwordInput,
    dateInput,
    genderInput
  ].map((input) => input.value.trim());

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  document
    .querySelectorAll(".form-group .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove());

  if (fullname === "") showError(fullnameInput, "Enter your full name");
  if (!emailPattern.test(email))
    showError(emailInput, "Enter a valid email address");

  validatePassword(password);
  if (date === "") showError(dateInput, "Select your date of birth");
  if (gender === "") showError(genderInput, "Select your gender");

  if (!document.querySelectorAll(".form-group .error").length) {
    form.style.display = "none";
    thankYouMessage.style.display = "block";
  }
};

passToggleBtn.addEventListener("click", () => {
  passToggleBtn.className =
    passwordInput.type === "password"
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

form.addEventListener("submit", handleFormData);
