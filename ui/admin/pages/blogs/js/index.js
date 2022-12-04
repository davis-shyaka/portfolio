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
              
          </div>
        </td>
      </tr>
         
          `
  );
});

const deleteButtons = [...document.getElementsByClassName("delete-blog")];
// console.log(deleteButtons);
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const deleteID = e.target.dataset.id;
    deletePost(deleteID);
  });
});

function deletePost(deleteID) {
  if (confirm("Are you sure?")) {
    localStorage.setItem(
      "blog",
      JSON.stringify(blogData.filter(({ id }) => id != deleteID))
    );
    location.reload();
  }
}

// Confirm Modal
