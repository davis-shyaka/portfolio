const baseURL = 'http://localhost:3000/post/all'
const getAllPosts = async () => {
  try {
    const response = await fetch(baseURL)
    const data = await response.json()
    const blogs = data.data
    return blogs
  } catch (error) {
    console.log('Error fetching posts: ', error.message)
  }
}

getAllPosts().then((res) => {
  const posts = res.length
  const stats = document.getElementById('stats-container')
  stats.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="card">
          <div class="card-title">
            <i class="fa-solid fa-newspaper"></i>
            <div class="card-topic">Articles</div>
          </div>
          <div class="number">${posts}</div>
      </div>

      <div class="card">
        <div class="card-title">
          <i class="fa-solid fa-eye"></i>
          <div class="card-topic">Reads</div>
        </div>
        <div class="number"></div>
      </div>

      <div class="card">
        <div class="card-title">
          <i class="fa-solid fa-comment"></i>
          <div class="card-topic">Comments</div>
        </div>
        <div class="number"></div>
      </div>
      `
  )
})
