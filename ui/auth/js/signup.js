const baseURL = 'http://localhost:3000/user/sign_up'
const createUser = async (
  surname,
  givenName,
  email,
  password,
  confirm_password
) => {
  try {
    const response = await fetch(baseURL, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        surname,
        givenName,
        email,
        password,
        confirm_password
      })
    })
    const data = await response.json()
    console.log(data)
    if (data?.statusCode === 201) {
      location.href = '/ui/auth/login.html'
    } else {
      const form = document.getElementById('form')
      const { surname, givenName, email, password, confirm_password } = form
      setInvalid(surname, data?.data[0]?.message)
      setInvalid(givenName, '')
      setInvalid(email, '')
      setInvalid(password, '')
      setInvalid(confirm_password, '')
    }
  } catch (error) {
    console.log('Error creating user: ', error)
  }
}
const form = document.getElementById('form')
const { surname, givenName, email, password, confirm_password } = form

form.addEventListener('submit', (e) => {
  e.preventDefault()

  // validate the fields
  if (validateForm(form)) {
    const surname = form.surname.value
    const givenName = form.givenName.value
    const email = form.email.value
    const password = form.password.value
    const confirm_password = form.confirm_password.value
    createUser(surname, givenName, email, password, confirm_password)
  } else {
    console.log('Failed to create user.')
  }
})

// User Validation
const validateForm = (form) => {
  let isRequired = true

  // Check for Required surname
  if (form.surname.value.trim() === '') {
    setInvalid(form.surname, 'Surname is required!')
    isRequired = false
  } else if (!validName(form.surname.value.trim())) {
    setInvalid(form.surname, 'Surname must be 3 - 30 characters long!')
    isRequired = false
  } else {
    setSuccess(form.surname)
  }

  // Check for Required givenName
  if (form.givenName.value.trim() === '') {
    setInvalid(form.givenName, 'Given Name is required!')
    isRequired = false
  } else if (!validName(form.givenName.value.trim())) {
    setInvalid(form.givenName, 'Given Name must be 3 - 30 characters long!')
    isRequired = false
  } else {
    setSuccess(form.givenName)
  }

  // Check for Required Email
  if (form.email.value.trim() === '') {
    setInvalid(form.email, 'Email is required!')
    isRequired = false
  } else if (!validEmail(form.email.value.trim())) {
    setInvalid(form.email, 'Email is not valid!')
    isRequired = false
  } else {
    setSuccess(form.email)
  }

  // Check for Required Password
  if (form.password.value.trim() === '') {
    setInvalid(form.password, 'Password is Required!')
    isRequired = false
  } else if (!validPassword(form.password.value.trim())) {
    setInvalid(
      form.password,
      'Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, 1 digit, and one special case character.'
    )
    isRequired = false
  } else {
    setSuccess(form.password)
  }

  // Check for Password match
  if (form.password.value.trim() !== form.confirm_password.value.trim()) {
    setInvalid(form.confirm_password, 'Passwords must match!')
    isRequired = false
  } else {
    // setSuccess(form.confirm_password)
  }

  return isRequired
}

// Set for Success Input Value
const setSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
  const formAlert = formControl.querySelector('.error')
  formAlert.innerHTML = ''
}

// Set for Invalid Input Value
const setInvalid = (input, message) => {
  const formControl = input.parentElement
  const formAlert = formControl.querySelector('.error')
  formControl.className = 'form-control invalid'
  formAlert.innerHTML = message
}

// Set for Valid Email Value
const validEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

// set for valid password value
const validPassword = (password) => {
  const re = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  return re.test(password)
}

// set for valid name value
const validName = (name) => {
  if (name.length >= 3 && name.length <= 30) {
    return true
  } else {
    return false
  }
}
