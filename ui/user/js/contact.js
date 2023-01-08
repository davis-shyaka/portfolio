import baseURL from '../../../helpers/baseURL.js'
const sendMessage = async (name, email, subject, message) => {
  const response = await fetch(baseURL + '/mail/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message
    })
  })
  const data = await response.json()
  if (data.success === true) {
    const form = document.getElementById('form')
    form.name.value = ''
    form.email.value = ''
    form.subject.value = ''
    form.message.value = ''
  }
}

const form = document.getElementById('form')

// on submit event
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = form.name.value
  const email = form.email.value
  const subject = form.subject.value
  const message = form.message.value
  // console.log("button clicked");
  if (validateForm(form)) {
    sendMessage(name, email, subject, message)
  }
})

// validate input fields
const validateForm = (form) => {
  let isRequired = true

  // Check for Required Name
  if (form.name.value.trim() === '') {
    setInvalid(form.name, 'Name is Required!')
    isRequired = false
  } else {
    setSuccess(form.name)
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

  // Check for Required Subject
  if (form.subject.value.trim() === '') {
    setInvalid(form.subject, 'Subject is Required!')
    isRequired = false
  } else {
    setSuccess(form.subject)
  }

  // Check for Required Message
  if (form.message.value.trim() === '') {
    setInvalid(form.message, 'Message is Required!')
    isRequired = false
  } else {
    setSuccess(form.message)
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
