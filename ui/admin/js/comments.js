const baseURL = 'http://localhost:3000/comment/all'
const commentsDOM = document.getElementById('comments')
const getAllComments = async () => {
  try {
    const response = await fetch(baseURL, {
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      }
    })
    const data = await response.json()
    const comments = data.data
    return comments
  } catch (error) {
    console.log('Error fetching messages: ', error.message)
  }
}

// render all comments
getAllComments()
  .then((res) => {
    res.forEach((item) => {
      commentsDOM.insertAdjacentHTML(
        'afterbegin',
        `
          <tr>
            <td data-label="From">${item.user.surname} ${item.user.givenName}</td>
            <td data-label="Comment">${item.comment}</td>
            <td data-label="Article">${item.post.title}</td>
            <td data-label="Publ. Date">${item.date}</td>
            <td data-label="Action">
            <div class="actions">
                <a href="mailto:${item.user.email}">
                  <i id="edit" class="fa-solid fa-reply"></i>
                </a>
                <i id="delete" data-id="${item._id}" data-blog="${item._id}" class="fa-solid fa-trash delete-comments"></i>
                <div class="global-container" id="global">
                  <div class="window">
                    <p class="head-msg">Are you sure you want to delete this comment by "${item.user.surname}"?</p>
                    <p class="main-msg">Comment: ${item.comment}</p>
                    <p class="main-msg">On: ${item.post.title}</p>
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

// delete a comment
const deleteComment = async (id) => {
  try {
    const deleteCommentResponse = await fetch(
      `http://localhost:3000/comment/delete/${id}`,
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
        },
        method: 'DELETE'
      }
    )
    const data = await deleteCommentResponse.json()
    if (data && data.statusCode === 200) {
      location.reload()
    }
  } catch (error) {
    console.log('Error deleting the comment: ', error)
  }
}

// the ui-part of deleting a post
const handleDelete = () => {
  const deleteButtons = [...document.getElementsByClassName('delete-comments')]
  const confirmedDelete = document.getElementById('confirmed-delete')

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const deleteID = e.currentTarget.dataset.id
      const deleteBlogID = e.currentTarget.dataset.blog
      modal()
      confirmedDelete.addEventListener('click', (e) => {
        deleteComment(deleteID, deleteBlogID)
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
