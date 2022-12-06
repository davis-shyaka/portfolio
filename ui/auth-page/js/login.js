const currentUser = {
  names: "",
  email: "",
  password: "",
};

let usersArray = JSON.parse(localStorage.getItem("users")) ?? [];

const form = document.getElementById("form");
const { email, password } = form;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  currentUser.email = form.email.value;
  currentUser.password = form.password.value;

  // first validate the input fields
  if (validateForm(form)) {
    // then check if the user exists in our local storage
    if (checkUser(currentUser)) {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(checkUser(currentUser))
      );
      if (checkUser(currentUser).isAdmin) {
        email.value = "";
        password.value = "";
        location.href = "/ui/admin/";
      } else {
        email.value = "";
        password.value = "";
        location.href = "/";
      }
    } else {
      setInvalid(form.email, "Unmatching email or password");
      setInvalid(form.password, "");
    }
  }
});

// check if the user exists and matches our records
function checkUser(currentUser) {
  return usersArray.find(
    ({ email, password }) =>
      currentUser.email === email && currentUser.password === password
  );
}

// validate input fields
// User Validation
const validateForm = (form) => {
  let isRequired = true;

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
