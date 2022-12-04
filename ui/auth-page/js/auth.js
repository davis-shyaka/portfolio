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

// get already registered users from local storage
let usersArray = JSON.parse(localStorage.getItem("users")) ?? [];

// function to create a user
const createUser = (user) => {
  usersArray.push(user);
  localStorage.setItem("users", JSON.stringify(usersArray));
  localStorage.setItem("isLoggedIn", JSON.stringify(user));
};

const form = document.getElementById("form");
const { names, username, email, password } = form;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm(form);
  user = {
    ...user,
    names: names.value,
    username: username.value,
    email: email.value,
    password: password.value,
  };
  if (validateForm(form)) {
    createUser(user);
    names.value = "";
    username.value = "";
    email.value = "";
    password.value = "";
    location.href = "/";
  } else {
    console.log("Error while saving user");
  }
});

// User Validation
const validateForm = (form) => {
  let isRequired = true;

  // Check for Required names
  if (form.names.value.trim() === "") {
    setInvalid(form.names, "Names are required!");
    isRequired = false;
  } else {
    setSuccess(form.names);
  }

  // Check for Required username
  if (form.username.value.trim() === "") {
    setInvalid(form.username, "Username is required!");
    isRequired = false;
  } else {
    setSuccess(form.username);
  }

  // Check for Required Email
  if (form.email.value.trim() === "") {
    setInvalid(form.email, "Email is required!");
    isRequired = false;
  } else if (!validEmail(form.email.value.trim())) {
    setInvalid(form.email, "Email is not valid!");
    isRequired = false;
  } else {
    setSuccess(form.email);
  }

  // Check for Required Password
  if (form.password.value.trim() === "") {
    setInvalid(form.password, "Password is Required!");
    isRequired = false;
  } else if (form.password.value.length < 9) {
    setInvalid(form.password, "Password must be at least 9 characters!");
    isRequired = false;
  } else {
    setSuccess(form.password);
  }

  return isRequired;
};

// Set for Success Input Value
const setSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const formAlert = formControl.querySelector(".error");
  formAlert.innerHTML = "";
};

// Set for Invalid Input Value
const setInvalid = (input, message) => {
  const formControl = input.parentElement;
  const formAlert = formControl.querySelector(".error");
  formControl.className = "form-control invalid";
  formAlert.innerHTML = message;
};

// Set for Valid Email Value
const validEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};
