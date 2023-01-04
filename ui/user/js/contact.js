const form = document.getElementById('form')

const errorTxt = document.querySelectorAll('#errorTxt')
let mailArray = []
let oldMail = JSON.parse(window.localStorage.getItem('mail')) ?? []
if (oldMail.length > 0) {
  oldMail?.forEach((item) => {
    mailArray.push(item)
  })
}

const { name, email, subject, message } = form
// on submit event
form.addEventListener('submit', (e) => {
  e.preventDefault()

  // console.log("button clicked");
  if (validateForm(form)) {
    // base data object
    const data = {
      id: '',
      sender: '',
      email: '',
      subject: '',
      mail: '',
      posted: ''
    }
    // storing the data
    const acceptData = () => {
      try {
        data.id = Date.now()
        data.sender = sender.value
        data.email = email.value
        data.subject = subject.value
        data.mail = mail.value

        // getting today's date
        let today = Date.now()
        today = new Date(today).toString()
        data.posted = today

        return data
      } catch (error) {
        console.log('Error while storing data in local storage:')
        console.log(error)
      }
    }
    mailArray.push(acceptData())
    window.localStorage.setItem('mail', JSON.stringify(mailArray))
    sender.value = ''
    email.value = ''
    subject.value = ''
    mail.value = ''
  }
})

// validate input fields
// User Validation
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
