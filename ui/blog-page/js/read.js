const newURL = new URL(location.href);
// console.log(newURL);
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
const ourBlog = blogData.find(({ id }) => {
  return id == newURL.hash.replace("#", "");
});
// console.log(ourBlog);
const articleDOM = document.querySelector("#read-article");
const { cover, id, title, caption, author, posted, reads, likes, article } =
  ourBlog;
articleDOM.insertAdjacentHTML(
  "afterbegin",
  `
  <div class="article-image">
          <img src="${cover}" alt="" srcset="" />
        </div>
        <div  class="article-body">
    <div class="article-header">
            <div class="article-title">
              <h1>${title}</h1>
              <h4>${caption}</h4>
            </div>
            <div class="article-stats">
            <button>
            <i id="likes" class="fa-solid fa-heart"></i>
            </button>
            <p>${likes}</p>
            <i class="fa-regular fa-eye"></i>
              <p>${reads}</p>
              <p>${posted}</p>
            </div>
          </div>
          <div class="article-text">
            <article>
             ${article}
            </article>
          </div>
          </div>
    `
);

// Comment Section
const commentForm = document.getElementById("comment-input-form");
const comment = document.getElementById("comment-area");
const commentsDOM = document.getElementById("old-comments");
const user = JSON.parse(localStorage.getItem("isLoggedIn"));
let today = Date.now();
today = new Date(today).toDateString();
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log("clicked button");
  //   console.log(comment.value);
  if (user) {
    if (ourBlog.comments) {
      let currentComment = {
        commenter: user.names,
        comment: comment.value,
        datePosted: today,
      };
      ourBlog.comments.push(currentComment);
    } else {
      ourBlog.comments = [comment.value];
    }
    localStorage.setItem("blog", JSON.stringify(blogData));
    //   console.log(blogData);
    comment.value = "";
    location.reload();
  } else {
    comment.value = "";
    location.href = "/ui/auth-page/login.html";
  }
});

ourBlog.comments.forEach((comment) => {
  commentsDOM.insertAdjacentHTML(
    "afterbegin",
    `
      <div id="singleComment">
      ${comment.comment}
      <div><p id="">${comment.commenter}</p></div>
      <div><p id="comment-date">${comment.datePosted}</p></div>
      </div>
        
        `
  );
});
