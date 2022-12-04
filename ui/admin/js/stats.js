const stats = document.getElementById("stats-container");
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
const count = blogData.length;
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
    `
);

export default { count };
