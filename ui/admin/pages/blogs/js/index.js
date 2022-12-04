const articles = document.getElementById("articles");
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
blogData.forEach((item) => {
  articles.insertAdjacentHTML(
    "afterbegin",
    `
        <tr>
        <td data-label="Cover">
          <img src="${item.cover}" alt="" srcset="" />
        </td>
        <td data-label="Title">${item.title}</td>
        <td data-label="Publ. Date">${item.posted}</td>
        <td data-label="Reads">${item.reads}</td>
        <td data-label="Action">
          <div class="actions">
          <a href="./editblog.html#${item.id}" rel="noopener noreferrer">
          <i id="edit" class="fa-solid fa-pen-to-square"></i>
          </a>
              <i id="delete" data-id = ${item.id} class="fa-solid fa-trash delete-blog"></i>
              
              <div class="global-container" id="global">
        <div class="window">
        <p class="head-msg">Are you sure you want to delete "${item.title}"?</p>
        <p class="main-msg">Title: ${item.title}</p>
        <p class="main-msg">Caption: ${item.caption}</p>
        <p class="main-msg">Reads: ${item.reads}</p>
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
});

const deleteButtons = [...document.getElementsByClassName("delete-blog")];
const confirmedDelete = document.getElementById("confirmed-delete");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const deleteID = e.target.dataset.id;
    modal();
    confirmedDelete.addEventListener("click", (e) => {
      deletePost(deleteID);
    });
  });
});

function deletePost(deleteID) {
  localStorage.setItem(
    "blog",
    JSON.stringify(blogData.filter(({ id }) => id != deleteID))
  );
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
