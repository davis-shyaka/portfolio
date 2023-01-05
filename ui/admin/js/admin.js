const checkPrivilege = () => {
  const admin = sessionStorage.getItem('isAdmin')
  if (!admin) {
    location.href = '/'
  } else if (admin === true) {
  }
}

checkPrivilege()
