const email = document.querySelector("#email");
const password = document.querySelector("#password");

const currentUser = {
  email: "",
  password: "",
};

let usersArray = JSON.parse(localStorage.getItem("users")) ?? [];

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  currentUser.email = email.value;
  currentUser.password = password.value;

  if (checkUser(currentUser)) {
    localStorage.setItem("authenticatedUser", JSON.stringify(currentUser));
    if (checkUser(currentUser).isAdmin) {
      location.href = "/ui/admin";
    } else {
      location.href = "/index.html";
    }
  } else {
    console.log("Invalid Credentials");
  }

  //   console.log(checkUser(currentUser));
  email.value = "";
  password.value = "";
});

function checkUser(currentUser) {
  // first check if the fields are not empty

  // check if the user exists and matches our records
  return usersArray.find(
    ({ email, password }) =>
      currentUser.email === email && currentUser.password === password
  );
}
