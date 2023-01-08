import baseURL from '../../../helpers/baseURL.js'
const articles = document.getElementById('cards')
const callAPI = async () => {
  try {
    const response = await fetch(`${baseURL}/post/all`)
    const data = await response.json()
    const blogs = data.data
    return blogs
  } catch (error) {
    console.log('Error fetching posts: ', error.message)
  }
}

callAPI().then((res) => {
  res?.forEach((item) => {
    articles.insertAdjacentHTML(
      'afterbegin',
      `
        <a href="/ui/user/pages/blogs-read.html#${item._id}" rel="noopener noreferrer">
              <div class="card">
                <div class="card-content">
                  <div class="card-image">
                    <i class="fa-duotone fa-apartment"></i>
                    <img src="${item.cover}" alt="" srcset="" />
                  </div>
                  <div class="card-info-wrapper">
                    <div class="card-info">
                      <i class="fa-duotone fa-apartment"></i>
                      <div class="card-info-title">
                        <h3>${item.title}</h3>
                        <h4>${item.caption}</h4>
                        <div class="card-stats">
                        <i class="fa-regular fa-eye"></i>
                          <p>${item.noOfLikes}</p>
                          <p>${item.createdOn}</p>
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
})
