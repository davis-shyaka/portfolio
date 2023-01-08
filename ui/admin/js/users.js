import baseURL from '../../../helpers/baseURL.js'
const articles = document.getElementById('articles')
const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseURL}/user/all`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      }
    })
    const data = await response.json()
    const users = data.data
    return users
  } catch (error) {
    console.log('Error fetching users: ', error.message)
  }
}

// render all users
getAllUsers()
  .then((res) => {
    res?.forEach((item) => {
      articles.insertAdjacentHTML(
        'afterbegin',
        `
          <tr>
          <td data-label="Cover">
            <!-- <img src="${item.cover}" alt="" srcset="" /> -->
          </td>
          <td data-label="Surname">${item.surname}</td>
          <td data-label="GivenName">${item.givenName}</td>
          <td data-label="Email">${item.email}</td>
          <td data-label="Publ. Date">${item.createdAt}</td>
          <td data-label="Action">
            <div class="actions">
                <i id="delete" data-id =${item._id} class="fa-solid fa-trash delete-user"></i>
                <div class="global-container" id="global">
          <div class="window">
          <p class="head-msg">Are you sure you want to delete "${item.surname}"?</p>
          <p class="main-msg">Surname: ${item.surname}</p>
          <p class="main-msg">Given Name: ${item.givenName}</p>
          <p class="main-msg">Email: ${item.email}</p>
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

// delete a user
const deleteUser = async (id) => {
  try {
    const deleteUserResponse = await fetch(`${baseURL}/user/delete/${id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      },
      method: 'DELETE'
    })
    const data = await deleteUserResponse.json()
    if (data && data.statusCode === 200) {
      location.reload()
    }
  } catch (error) {
    console.log('Error deleting the user: ', error)
  }
}

// the ui-part of deleting a user
const handleDelete = () => {
  const deleteButtons = [...document.getElementsByClassName('delete-user')]
  const confirmedDelete = document.getElementById('confirmed-delete')

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const deleteID = e.currentTarget.dataset.id
      const deleteBlogID = e.currentTarget.dataset.blog
      modal()
      confirmedDelete.addEventListener('click', (e) => {
        deleteUser(deleteID, deleteBlogID)
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
