const signOut = async () => {
  const logout = document.querySelector("logout");

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked the button to log out");
    localStorage.removeItem("isLoggedIn");
  });
};

export default signOut;
