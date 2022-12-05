// const logout = document.querySelector("logout");

// logout.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("clicked the button to log out");
//   localStorage.removeItem("isLoggedIn");
//   location.href = "/";
// });

const signOut = () => {
  const logout = document.querySelector("logout");

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    location.href = "/";
  });
};

export default signOut;
