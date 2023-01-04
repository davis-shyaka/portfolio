const commentsDOM = document.getElementById("comments");
let blogs = JSON.parse(window.localStorage.getItem("blog")) ?? [];
blogs.forEach(({ comments }) => {
  comments.forEach(
    ({ blogID, commentID, comment, commenter, article, datePosted }) => {
      commentsDOM.insertAdjacentHTML(
        "afterbegin",
        `
      <tr>
                      <td data-label="From">${commenter}</td>
                      <td data-label="Comment">
                        ${comment}
                      </td>
                      <td data-label="Article">${article}</td>
                      <td data-label="Publ. Date">${datePosted}</td>
                      <td data-label="Action">
                        <div class="actions">
                          <a href="#"
                            ><i id="edit" class="fa-solid fa-reply"></i
                          ></a>
                          <i id="delete" data-id="${commentID}" data-blog="${blogID}" class="fa-solid fa-trash delete-comments"></i>


                          <div class="global-container" id="global">
                          <div class="window">
                          <p class="head-msg">Are you sure you want to delete this comment by "${commenter}"?</p>
                          <p class="main-msg">Comment: ${comment}</p>
                          <p class="main-msg">On: ${article}</p>
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
      );
    }
  );
});

const deleteButtons = [...document.getElementsByClassName("delete-comments")];
const confirmedDelete = document.getElementById("confirmed-delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const deleteID = e.currentTarget.dataset.id;
    const deleteBlogID = e.currentTarget.dataset.blog;
    modal();
    confirmedDelete.addEventListener("click", (e) => {
      deletePost(deleteID, deleteBlogID);
    });
  });
});

function deletePost(deleteID, deleteBlogID) {
  const theBlog = blogs.find(({ id }) => id == deleteBlogID);
  console.log(
    theBlog.comments.filter(({ commentID }) => commentID != deleteID)
  );

  const updatedBlog = blogs.map((blog) => {
    if (blog.id == deleteBlogID) {
      blog.comments = theBlog.comments.filter(
        ({ commentID }) => commentID != deleteID
      );
      return blog;
    }
    return blog;
  });

  localStorage.setItem("blog", JSON.stringify(updatedBlog));
  location.reload();
}

// Confirm Modal
let del = document.getElementById("delete-button");
let modalWindow = document.querySelector(".global-container");
let cancelButton = document.querySelector(".cancel-button");

function modal() {
  modalWindow.classList.remove("unpop");
  modalWindow.classList.add("pop");
}

cancelButton.addEventListener("click", unmodal);
function unmodal() {
  modalWindow.classList.remove("pop");
  modalWindow.classList.add("unpop");
}

modalWindow.addEventListener("click", outWin);
function outWin(e) {
  if (e.target.id === "global") {
    unmodal();
  }
}
