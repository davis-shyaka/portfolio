const names = document.querySelector("#names");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

let user = {
  id: crypto.randomUUID(),
  names: null,
  username: null,
  email: null,
  password: null,
  isAdmin: false,
  avatar: null,
  signedAt: Date.now(),
};

let usersArray = JSON.parse(localStorage.getItem("users")) ?? [];
const createUser = (user) => {
  usersArray.push(user);
  localStorage.setItem("users", JSON.stringify(usersArray));
  console.log(usersArray);
  location.reload();
};

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  user = {
    ...user,
    names: names.value,
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(user);
  if (validateInputs()) {
    createUser(user);
  } else {
    console.log("Error while saving user");
  }
});

// User Validation

const showError = (element, message) => {
  const inputField = element.parentElement;
  const errorView = inputField.querySelector(".error");
  errorView.innerText = message;
  inputField.classList.add("error");
  inputField.classList.remove("success");
};
const showSuccess = (element) => {
  const inputField = element.parentElement;
  const errorView = inputField.querySelector(".error");
  errorView.innerText = "";
  inputField.classList.add("success");
  inputField.classList.remove("error");
};

const validateInputs = () => {
  const namesValue = names.value.trim();
  const userNameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // check names field
  if (namesValue === "") {
    showError(names, "Name(s) is required");
    return false;
  } else if (validateInput(namesValue)) {
    showError(names, "Please provide a real name(s) between 3-32 characters.");
  } else {
    showSuccess(names);
    return true;
  }

  // check username field
  if (userNameValue === "") {
    showError(names, "Username is required");
  } else if (validateInput(userNameValue)) {
    showError(username, "Please provide a valid user name.");
  } else {
    showSuccess(username);
  }

  // check email field
  if (emailValue === "") {
    showError(email, "Email is required");
  } else if (validateInput(emailValue)) {
    showError(email, "Please provide a valid email address.");
  } else {
    showSuccess(email);
  }

  // check password field
  if (passwordValue === "") {
    showError(password, "Password is required");
  } else if (validateInput(password)) {
    showError(
      password,
      "Passowrd must be at least 8 charachters, contain a number and a special character"
    );
  } else {
    showSuccess(password);
  }
};

// strict validation of input fields
function validateInput(type) {
  // the names
  if (type === "names") return type.match(/^[a-z][a-z '-.,]{2,31}$|^$/i);

  // the username
  if (type === "username") return type.match(/^[a-z0-9_.]+$/);

  // the email
  if (type === "email") {
    return type.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  // the password
  if (type === "password")
    return type.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
}
