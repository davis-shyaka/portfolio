const newURL = new URL(location.href);
// console.log(newURL);
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
const ourBlog = blogData.find(({ id }) => {
  return id == newURL.hash.replace("#", "");
});
// console.log(ourBlog);
const articleDOM = document.querySelector("#read-article");
const { cover, id, title, caption, author, posted, reads, article } = ourBlog;
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
              <img src="../../blog-page/assets/Vector.svg" alt="" srcset="" />
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
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log("clicked button");
  //   console.log(comment.value);
  if (ourBlog.comments) {
    ourBlog.comments.push(comment.value);
  } else {
    ourBlog.comments = [comment.value];
  }
  localStorage.setItem("blog", JSON.stringify(blogData));
  //   console.log(blogData);
  comment.value = "";
  location.reload();
});

ourBlog.comments.forEach((comment) => {
  commentsDOM.insertAdjacentHTML(
    "afterbegin",
    `
      <li id="singleComment">${comment}</li>
      
      `
  );
});
