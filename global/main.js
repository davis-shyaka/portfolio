const checkIsLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("authenticatedUser"));
  if (user) {
    const account = document.getElementById("account");
    account.outerHTML = "<i class='fa fa-save'></i>";

    // render a logout button after hinding the first one

    // history.back();
  }
};
export default checkIsLoggedIn;
