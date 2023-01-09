import baseURL from '../../../helpers/baseURL.js'
const articles = document.getElementById('articles')
const getAllPosts = async () => {
  try {
    const response = await fetch(`${baseURL}/post/all`)
    const data = await response.json()
    const blogs = data.data
    return blogs
  } catch (error) {
    console.log('Error fetching posts: ', error.message)
  }
}

// render all posts
getAllPosts()
  .then((res) => {
    res?.forEach((item) => {
      articles.insertAdjacentHTML(
        'afterbegin',
        `
          <tr>
            <td data-label="Cover">
            <img src="${item.cover}" alt="" srcset="" />
            </td>
          <td data-label="Title">${item.title}</td>
          <td data-label="Publ. Date">${item.createdOn}</td>
          <td data-label="Reads">${item.likes.length}</td>
          <td data-label="Action">
            <div class="actions">
              <a href="/ui/admin/pages/editBlog.html#${item._id}" rel="noopener noreferrer">
              <i id="edit" class="fa-solid fa-pen-to-square"></i>
              </a>
              <i id="delete" data-id =${item._id} class="fa-solid fa-trash delete-blog"></i>
              <div class="global-container" id="global">
          <div class="window">
          <p class="head-msg">Are you sure you want to delete "${item.title}"?</p>
          <p class="main-msg">Title: ${item.title}</p>
          <p class="main-msg">Caption: ${item.caption}</p>
          <div class="confirm">
              <button class="cancel-button">CANCEL</button>
              <button id="confirmed-delete" class="delete-button">DELETE</button>
          </div>
        </div>
      </div>
      </div>
          </td>
        </tr>
        `
      )
    })
  })
  .then(() => {
    handleDelete()
  })

// delete a post
const deletePost = async (id) => {
  try {
    const deletePostResponse = await fetch(`${baseURL}/post/delete/${id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      },
      method: 'DELETE'
    })
    const data = await deletePostResponse.json()
    if (data && data.statusCode === 200) {
      location.reload()
    }
  } catch (error) {
    console.log('Error deleting the post: ', error)
  }
}

// the ui-part of deleting a post
const handleDelete = () => {
  const deleteButtons = [...document.getElementsByClassName('delete-blog')]
  const confirmedDelete = document.getElementById('confirmed-delete')

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const deleteID = e.currentTarget.dataset.id
      const deleteBlogID = e.currentTarget.dataset.blog
      modal()
      confirmedDelete.addEventListener('click', (e) => {
        deletePost(deleteID, deleteBlogID)
      })
    })
  })
  // Confirm Modal
  let del = document.getElementById('delete-button')
  let modalWindow = document.querySelector('.global-container')
  let cancelButton = document.querySelector('.cancel-button')

  function modal() {
    modalWindow.classList.remove('unpop')
    modalWindow.classList.add('pop')
  }

  cancelButton?.addEventListener('click', unmodal)
  function unmodal() {
    modalWindow.classList.remove('pop')
    modalWindow.classList.add('unpop')
  }

  modalWindow?.addEventListener('click', outWin)
  function outWin(e) {
    if (e.target.id === 'global') {
      unmodal()
    }
  }
}
