import baseURL from '../../../helpers/baseURL.js'

const newURL = new URL(location.href)
const postID = newURL.hash.replace('#', '')
const articleDOM = document.querySelector('#read-article')
// Comment Section
const commentForm = document.getElementById('comment-input-form')
const comment = document.getElementById('comment-area')
const commentsDOM = document.getElementById('old-comments')

// request functions

// get this individual post
const getPost = async () => {
  try {
    const response = await fetch(`${baseURL}/post/get/${postID}`)
    const data = await response.json()
    const ourBlog = data.data[0]
    return ourBlog
  } catch (error) {
    console.log('Error fetching post: ', error.message)
  }
}

// get all comments on this post
const getAllComments = async () => {
  try {
    const response = await fetch(`${baseURL}/post/${postID}/comment/all`)
    const data = await response.json()
    const comments = data.data
    return comments
  } catch (error) {
    console.log('Error fetching comments: ', error.message)
  }
}

// create a comment on this post
const createComment = async (comment) => {
  try {
    const response = await fetch(`${baseURL}/post/create/comment/${postID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${sessionStorage.getItem('auth-token')}`
      },
      body: JSON.stringify({
        comment
      })
    })
    const data = await response.json()
    if (data.success === false) {
      location.href = '/ui/auth/login.html'
    } else {
      const comment = document.getElementById('comment-area')
      comment.value = ''
      location.reload()
    }
  } catch (error) {
    console.log('Error creating comment: ', error.message)
  }
}
getPost().then((res) => {
  articleDOM.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="article-image">
                <img src="${res.cover}" alt="" srcset="" />
              </div>
              <div  class="article-body">
          <div class="article-header">
                  <div class="article-title">
                    <h1>${res.title}</h1>
                    <h4>${res.caption}</h4>
                  </div>
                  <div class="article-stats">
                  <i class="fa-regular fa-eye"></i>
                    <p>${res.noOfLikes}</p>
                    <p>${res.createdOn}</p>
                  </div>
                </div>
                <div class="article-text">
                  <article>
                   ${res.content}
                  </article>
                </div>
                </div>
          `
  )
  // render comments
  getAllComments().then((res) => {
    res.forEach((comment) => {
      commentsDOM.insertAdjacentHTML(
        'afterbegin',
        `
            <div id="singleComment">
            ${comment.comment}
            <div><p id="comment-date">By:</p> ${comment.user.surname} ${comment.user.givenName}</div>
            <div><p id="comment-date">${comment.date}</p></div>
            </div>
              
              `
      )
    })
  })

  // create comment on the post
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const commentText = comment.value
    if (validateForm(commentForm)) {
      createComment(commentText)
    }
  })
})

// const newURL = new URL(location.href);
// let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
// const ourBlog = blogData.find(({ id }) => {
//   return id == newURL.hash.replace("#", "");
// });
// const articleDOM = document.querySelector("#read-article");
// const { cover, id, title, caption, author, posted, reads, likes, article } =
//   ourBlog;
// articleDOM.insertAdjacentHTML(
//   "afterbegin",
//   `
//   <div class="article-image">
//           <img src="${cover}" alt="" srcset="" />
//         </div>
//         <div  class="article-body">
//     <div class="article-header">
//             <div class="article-title">
//               <h1>${title}</h1>
//               <h4>${caption}</h4>
//             </div>
//             <div class="article-stats">
//             <i class="fa-regular fa-eye"></i>
//               <p>${reads}</p>
//               <p>${posted}</p>
//             </div>
//           </div>
//           <div class="article-text">
//             <article>
//              ${article}
//             </article>
//           </div>
//           </div>
//     `
// );

{
  /* <button>
  <i id="likes" class="fa-solid fa-heart"></i>
</button>
<p>${likes}</p> */
}

// Comment Section
// const commentForm = document.getElementById('comment-input-form')
// const comment = document.getElementById('comment-area')
// const commentsDOM = document.getElementById('old-comments')
// const user = JSON.parse(localStorage.getItem('isLoggedIn'))
// let today = Date.now()
// today = new Date(today).toDateString()
// commentForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   if (validateForm(commentForm)) {
//     if (user) {
//       if (ourBlog.comments) {
//         let currentComment = {
//           blogID: ourBlog.id,
//           commentID: crypto.randomUUID(),
//           commenter: user.names,
//           comment: comment.value,
//           datePosted: today,
//           email: user.email,
//           article: ourBlog.title
//         }
//         ourBlog.comments.push(currentComment)
//       } else {
//         ourBlog.comments = [comment.value]
//       }
//       localStorage.setItem('blog', JSON.stringify(blogData))
//       comment.value = ''
//       location.reload()
//     } else {
//       comment.value = ''
//       location.href = '/ui/auth-page/login.html'
//     }
//   }
// })

// ourBlog.comments.forEach((comment) => {
//   commentsDOM.insertAdjacentHTML(
//     'afterbegin',
//     `
//       <div id="singleComment">
//       ${comment.comment}
//       <div><p id="comment-date">By:</p> ${comment.commenter}</div>
//       <div><p id="comment-date">${comment.datePosted}</p></div>
//       </div>

//         `
//   )
// })

const validateForm = (form) => {
  let isRequired = true

  // Check for Required comment
  if (form.commentArea.value.trim() === '') {
    setInvalid(form.commentArea, 'Comment cannot be empty!')
    isRequired = false
  } else {
    setSuccess(form.commentArea)
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
