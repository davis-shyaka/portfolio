import baseURL from '../../../helpers/baseURL.js'

const newURL = new URL(location.href)
const postID = newURL.hash.replace('#', '')

const getPost = async (id) => {
  try {
    const getPostResponse = await fetch(`${baseURL}/post/get/${id}`)
    const data = await getPostResponse.json()
    return data.data[0]
  } catch (error) {
    console.log('Error getting post: ', error.message)
  }
}
getPost(postID).then((res) => {
  // console.log('This is the post: ', res)
  preview.style.display = 'block'
  preview.src = res.cover
  title.value = res.title
  caption.value = res.caption
  content.value = res.content
})

//

const form = document.getElementById('form')
const preview = document.getElementById('file-ip-1-preview')

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

// update a post
const updatePost = async (id, title, caption, content) => {
  try {
    const updatePostResponse = await fetch(`${baseURL}/post/update/${id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        title,
        caption,
        content
      })
    })
    const data = await updatePostResponse.json()
    if (data && data.statusCode === 200) {
      location.href = '/ui/admin/pages/blogs.html'
    }
  } catch (error) {
    console.log('Error updating post: ', error)
  }
}
// on submit event
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = form.title.value
  const caption = form.caption.value
  const content = form.content.value
  // console.log("button clicked");
  if (validateForm(form)) {
    // update the post with the patch request
    updatePost(postID, title, caption, content)
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
