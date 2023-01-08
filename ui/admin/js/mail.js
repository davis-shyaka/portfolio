import baseURL from '../../../helpers/baseURL.js'
const mail = document.getElementById('mail')
const getAllMessages = async () => {
  try {
    const response = await fetch(`${baseURL}/mail/all`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      }
    })
    const data = await response.json()
    const mail = data.data
    return mail
  } catch (error) {
    console.log('Error fetching messages: ', error.message)
  }
}

// render all messages
getAllMessages().then((res) => {
  res?.forEach((item) => {
    mail.insertAdjacentHTML(
      'afterbegin',
      `
        <tr>
          <td data-label="From">${item.name}</td>
          <td data-label="Subject">${item.subject}</td>
          <td data-label="Publ. Date">${item.date}</td>
          <td data-label="Action">
            <div class="actions">
              <a href="mailto:${item.email}">
                <i id="edit" class="fa-solid fa-reply"></i>
              </a>
            </div>
          </td>
        </tr>
             
      `
    )
  })
})
