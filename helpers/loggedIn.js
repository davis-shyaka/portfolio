const checkIsLoggedIn = () => {
  const user = sessionStorage?.getItem('auth-token')
  if (user) {
    const account = document?.getElementById('account')
    account.outerHTML = `<a href='/ui/auth/logout.html'>
    <i id='logout' class='fa-solid fa-power-off'></i></a>`
  }
  return true
}

export { checkIsLoggedIn }
