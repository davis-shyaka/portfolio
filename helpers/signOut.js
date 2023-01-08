const signOut = () => {
  const logout = document.querySelector('logout')

  logout.addEventListener('click', (e) => {
    e.preventDefault()
    sessionStorage.removeItem('admin-token')
    location.href = '/'
  })
}

export default signOut
