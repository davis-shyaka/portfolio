// Targetting all classes & id from HTML
let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let names = id("names"),
  email = id("email"),
  password = id("password"),
  //   password2 = id("confirm-password"),
  form = id("form"),
  errorMsg = classes("error");

// Targetting all errorTxt ids from HTML
let errorTxt = document.querySelectorAll("#errorTxt");

// Adding the submit event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  engine(names, 0, "Username cannot be blank", errorTxt);
  engine(email, 1, "Email cannot be blank", errorTxt);
  engine(password, 2, "Password cannot be blank", errorTxt);
  //   engine(password2, 3, "", errorTxt);

  checkLength(
    names,
    0,
    "Name(s) must be 3-20 characters long",
    errorTxt,
    3,
    20
  );

  //   checkPasswordMatch(
  //     password,
  //     password2,
  //     3,
  //     "Passwords do not match",
  //     errorTxt
  //   );
});

// engine function which will do the basic works
let engine = (id, serial, message, errorTxt) => {
  if (id.value.trim() === "") {
    showError(id, serial, message, errorTxt);
  } else {
    showSuccess(id, serial);
  }
};

//check input Length
function checkLength(id, serial, message, errorTxt, min, max) {
  if (id.value.length < min || id.value.length > max) {
    showError(id, serial, message, errorTxt);
  } else {
    showSuccess(id, serial);
  }
}

// // check passwords match
// function checkPasswordMatch(password, password2, serial, message, errorTxt) {
//   if (password.value !== password2.value) {
//     console.log(password.value, " : ", password2.value);
//     showError(password2, serial, message, errorTxt);
//   } else {
//     showSuccess(password, serial);
//   }
// }

// Show input error messages
function showError(id, serial, message, errorTxt) {
  errorMsg[serial].innerHTML = message;
  id.style.border = "1px solid red";
  errorTxt.forEach((e) => {
    e.classList.add("active");
  });
}

// show input success
const showSuccess = (id, serial) => {
  errorMsg[serial].innerHTML = "";
  id.style.border = "1px solid #a8eb12";
};
