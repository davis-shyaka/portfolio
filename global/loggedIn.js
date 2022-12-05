const checkIsLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (user) {
    // console.log("This user is logged in");
    const account = document.getElementById("account");
    // account.outerHTML = "<i id='logout' class='fa-solid fa-power-off'></i>";
    account.outerHTML = `<a href='/ui/auth-page/logout.html'>
    <i id='logout' class='fa-solid fa-power-off'></i></a>`;
    // history.back();
  }
  return true;
};

export default checkIsLoggedIn;

{
  /* <span id='logout'>Logout</span> */
}
