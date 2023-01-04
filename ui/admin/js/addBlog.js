const form = document.getElementById('form')
const image = document.getElementById('image_uploads')
const articles = document.getElementById('articles')
const preview = document.getElementById('file-ip-1-preview')

let blogArray = []
let oldBlog = JSON.parse(window.localStorage.getItem('blog')) ?? []
if (oldBlog.length > 0) {
  oldBlog?.forEach((item) => {
    blogArray.push(item)
  })
}
// previewing the cover image within the form
async function showPreview(event) {
  if (event.target.files.length > 0) {
    preview.src = await readImage(event.target.files[0])
    preview.style.display = 'block'
  }
}

// read image function
function readImage(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', (e) => {
      resolve(fileReader.result)
    })
  })
}
// on submit event
const { image_uploads, title, caption, content } = form
form.addEventListener('submit', (e) => {
  e.preventDefault()

  // console.log("button clicked");
  if (validateForm(form)) {
    // base data object
    const data = {
      id: '',
      cover: '',
      title: '',
      caption: '',
      author: '',
      article: '',
      posted: '',
      reads: '',
      likes: '',
      comments: []
    }
    // storing the data
    const acceptData = () => {
      try {
        data.id = Date.now()
        data.cover = preview.src
        data.title = title.value
        data.caption = caption.value
        data.author = author.value
        data.article = article.value

        let today = Date.now()
        today = new Date(today).toDateString()
        data.posted = today
        data.reads = 0
        data.likes = 0

        return data
      } catch (error) {
        console.log('Error while storing data in local storage:')
        console.log(error)
      }
    }
    blogArray.push(acceptData())
    window.localStorage.setItem('blog', JSON.stringify(blogArray))
    title.value = ''
    caption.value = ''
    author.value = ''
    article.value = ''
    image.value = ''
    preview.style.display = 'none'

    window.location.replace('/ui/admin/pages/blogs/index.html')
  }
})

// validate input fields
// User Validation
const validateForm = (form) => {
  let isRequired = true

  // Check for Required Image_uploads
  if (form.image_uploads.value.trim() === '') {
    setInvalid(form.image_uploads, 'Image is Required!')
    isRequired = false
  } else {
    setSuccess(form.image_uploads)
  }

  // Check for Required Title
  if (form.title.value.trim() === '') {
    setInvalid(form.title, 'Title is Required!')
    isRequired = false
  } else {
    setSuccess(form.title)
  }
  // Check for Required Caption
  if (form.caption.value.trim() === '') {
    setInvalid(form.caption, 'Caption is Required!')
    isRequired = false
  } else {
    setSuccess(form.caption)
  }

  // Check for Required Content
  if (form.content.value.trim() === '') {
    setInvalid(form.content, 'Content is Required!')
    isRequired = false
  } else {
    setSuccess(form.content)
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
