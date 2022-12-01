let form = document.getElementById("form");
let image = document.getElementById("image_uploads");
let title = document.getElementById("title");
let caption = document.getElementById("caption");
let author = document.getElementById("author");
let article = document.getElementById("article");
let errorTxt = document.querySelectorAll("#errorTxt");
let articles = document.getElementById("articles");
let preview = document.getElementById("file-ip-1-preview");

function showPreview(event) {
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    preview.src = src;
    preview.style.display = "block";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");

  if (formValidation()) {
    acceptData();
  }
});

// validate the form
let formValidation = () => {
  if (
    engine(image, 0, "Must choose an image", errorTxt) &&
    engine(title, 1, "Title cannot be blank", errorTxt) &&
    engine(caption, 2, "Caption cannot be blank", errorTxt) &&
    engine(author, 3, "Author cannot be blank", errorTxt) &&
    engine(article, 4, "Article cannot be blank", errorTxt)
  ) {
    return true;
  } else {
    return false;
  }
};

// engine function which will do the basic works
let engine = (id, serial, message, errorTxt) => {
  if (id.value.trim() === "") {
    showError(id, serial, message, errorTxt);
    return false;
  } else {
    showSuccess(id, serial);
    return true;
  }
};
// Show input error messages
function showError(id, serial, message, errorTxt) {
  errorTxt[serial].innerHTML = message;
  id.style.border = "1px solid red";
  errorTxt.forEach((e) => {
    // e.classList.add("active");
    e.style.color = "red";
    e.style.marginBottom = "5px";
  });
}

// show input success
const showSuccess = (id, serial) => {
  errorTxt[serial].innerHTML = "";
  id.style.border = "1px solid #a8eb12";
};

let data = {};

let acceptData = () => {
  data["cover"] = URL.createObjectURL(image.files[0]);
  data["title"] = title.value;
  data["caption"] = caption.value;
  data["author"] = author.value;
  data["article"] = article.value;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let hr = today.getHours();
  let min = today.getMinutes();

  today = dd + "/" + mm + "/" + yyyy + " - " + hr + ":" + min;

  data["posted"] = today;
  data["reads"] = 0;

  createPost();
  console.log(data);
};

let createPost = () => {
  articles.insertAdjacentHTML(
    "afterbegin",
    `
  <tr>
  <td data-label="Cover">
    <img src="${data.cover}" alt="" srcset="" />
  </td>
  <td data-label="Title">${data.title}</td>
  <td data-label="Publ. Date">${data.posted}</td>
  <td data-label="Reads">${data.reads}</td>
  <td data-label="Action">
    <div class="actions">
        <i id="edit" onClick="editPost(this)" class="fa-solid fa-pen-to-square"></i>
        <i id="delete" onClick="deletePost(this)" class="fa-solid fa-trash"></i
    </div>
  </td>
</tr>
   
    `
  );
  title.value = "";
  caption.value = "";
  author.value = "";
  article.value = "";
  image.value = "";
  preview.style.display = "none";
};

let deletePost = (e) => {
  e.parentElement.parentElement.parentElement.remove();
};

let editPost = (e) => {
  title.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};
