// const baseURL = 'https://portfolio-api-production-d70c.up.railway.app/'
const baseURL = 'http://localhost:3000/post/all'
const articles = document.getElementById('cards')
const callAPI = async () => {
  try {
    const response = await fetch(baseURL)
    const data = await response.json()
    const blogs = data.data
    // console.log(blogs)
    blogs.forEach(({ cover, _id, title, caption, posted, reads }) => {
      articles.insertAdjacentHTML(
        'afterbegin',
        `
          <a href="/ui/user/pages/blogs-read.html#${_id}" rel="noopener noreferrer">
                <div class="card">
                  <div class="card-content">
                    <div class="card-image">
                      <i class="fa-duotone fa-apartment"></i>
                      <img src="${cover}" alt="" srcset="" />
                    </div>
                    <div class="card-info-wrapper">
                      <div class="card-info">
                        <i class="fa-duotone fa-apartment"></i>
                        <div class="card-info-title">
                          <h3>${title}</h3>
                          <h4>${caption}</h4>
                          <div class="card-stats">
                          <i class="fa-regular fa-eye"></i>
                            <p>${reads}</p>
                            <p>${posted}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
          `
      )
    })
  } catch (error) {
    console.log('Error fetching posts: ', error.message)
  }
}

callAPI()

// using local storage
// const articles = document.getElementById('cards')
// let blogData = JSON.parse(window.localStorage.getItem('blog')) ?? []
// blogData.forEach(({ cover, id, title, caption, author, posted, reads }) => {
//   articles.insertAdjacentHTML(
//     'afterbegin',
//     `
//     <a href="/ui/blog-page/read.html#${id}" rel="noopener noreferrer">
//           <div class="card">
//             <div class="card-content">
//               <div class="card-image">
//                 <i class="fa-duotone fa-apartment"></i>
//                 <img src="${cover}" alt="" srcset="" />
//               </div>
//               <div class="card-info-wrapper">
//                 <div class="card-info">
//                   <i class="fa-duotone fa-apartment"></i>
//                   <div class="card-info-title">
//                     <h3>${title}</h3>
//                     <h4>${caption}</h4>
//                     <div class="card-stats">
//                     <i class="fa-regular fa-eye"></i>
//                       <p>${reads}</p>
//                       <p>${posted}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </a>
//     `
//   )
// })
