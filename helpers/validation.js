const validateForm = (field) => {
  let isRequired = true

  if (field === 'email' || field === 'Email') {
    if (field.value.trim() === '') {
      setInvalid(field, 'Email is required!')
      isRequired = false
    } else if (!validEmail(field.value.trim())) {
      setInvalid(field, 'Email is not valid!')
      isRequired = false
    } else {
      setSuccess(field)
    }
  } else if (field === 'password' || field === 'Password') {
    if (field.value.trim() === '') {
      setInvalid(field, 'Password is Required!')
      isRequired = false
    } else if (field.value.length < 9) {
      setInvalid(field, 'Password must be at least 9 characters!')
      isRequired = false
    } else {
      setSuccess(field)
    }
  } else {
    if (field.value.trim() === '') {
      setInvalid(field, `${field} is required!`)
      isRequired = false
    } else {
      setSuccess(field)
    }
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

export { validateForm, setSuccess, setInvalid }
