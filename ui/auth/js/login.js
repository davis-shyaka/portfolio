const baseURL = 'http://localhost:3000/user/log_in'
const loginUser = async (email, password) => {
  try {
    const response = await fetch(baseURL, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (data?.data[0]?.user) {
      sessionStorage.setItem('auth-token', data?.data[0]?.user?.token)
      if (data?.data[0]?.user?.isAdmin === true) {
        sessionStorage.setItem('isAdmin', data.data[0]?.user?.isAdmin)
        location.href = '/ui/admin'
      } else {
        location.href = '/'
      }
    } else if (data?.success === false) {
      const form = document.getElementById('form')
      const { email, password } = form
      setInvalid(email, data?.data[0]?.message)
      setInvalid(password, '')
    }
  } catch (error) {
    console.log('Error signing in a user: ', error.message)
  }
}

const form = document.getElementById('form')
const { email, password } = form

form.addEventListener('submit', (e) => {
  e.preventDefault()

  // first validate the input fields
  if (validateForm(form)) {
    const email = form.email.value
    const password = form.password.value
    loginUser(email, password)
  }
})

// validate input fields
// User Validation
const validateForm = (form) => {
  let isRequired = true

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
  } else {
    setSuccess(form.password)
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
