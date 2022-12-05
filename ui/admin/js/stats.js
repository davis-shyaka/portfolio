const stats = document.getElementById("stats-container");
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
const count = blogData.length;
const comments = blogData.forEach(({ comment }) => {
  console.log(comment);
});
stats.insertAdjacentHTML(
  "afterbegin",
  `
    <div class="card">
        <div class="card-title">
            <i class="fa-solid fa-newspaper"></i>
            <div class="card-topic">Articles</div>
        </div>
        <div class="number">${count}</div>
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
);

export default { count };
