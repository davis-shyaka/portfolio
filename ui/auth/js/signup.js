const baseURL = 'http://localhost:3000/user/sign_up'
const createUser = async (
  surname,
  givenName,
  email,
  password,
  confirm_password
) => {
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
  // try {
  //   const response = await fetch(baseURL, {
  //     method: 'post',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       surname,
  //       givenName,
  //       email,
  //       password,
  //       confirm_password
  //     })
  //   })
  //   const data = await response.json()
  //   console.log(data)
  //   if (data?.statusCode === 409) {
  //     const form = document.getElementById('form')
  //     const { surname, givenName, email, password, confirm_password } = form
  //     setInvalid(email, data?.data[0]?.message)
  //   } else if (data?.success === false) {
  //     const form = document.getElementById('form')
  //     const { surname, givenName, email, password, confirm_password } = form
  //     setInvalid(email, data?.data[0]?.message)
  //   } else if (data?.statusCode === 201) {
  //     console.log('success')
  //   }
  // } catch (error) {
  //   console.log('Error creating user: ', error)
  // }
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

    // redirect to the landing page
  } else {
    console.log('error creating user')
  }
})

// User Validation
const validateForm = (form) => {
  let isRequired = true

  // Check for Required surname
  if (form.surname.value.trim() === '') {
    setInvalid(form.surname, 'Surname is required!')
    isRequired = false
  } else {
    setSuccess(form.surname)
  }

  // Check for Required givenName
  if (form.givenName.value.trim() === '') {
    setInvalid(form.givenName, 'Given Name is required!')
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
  } else if (form.password.value.length < 9) {
    setInvalid(form.password, 'Password must be at least 9 characters!')
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
