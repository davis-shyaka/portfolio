const articles = document.getElementById("articles");
let blogData = window.localStorage.getItem("blog");
// console.log("local storage:");
// console.log(JSON.parse(blogData));
blogData = JSON.parse(blogData);
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
              <i id="edit" onClick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
              <i id="delete" onClick="deletePost(this)" class="fa-solid fa-trash"></i
          </div>
        </td>
      </tr>
         
          `
  );
});
