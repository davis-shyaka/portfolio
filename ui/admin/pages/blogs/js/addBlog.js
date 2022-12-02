const form = document.getElementById("form");
const image = document.getElementById("image_uploads");
const title = document.getElementById("title");
const caption = document.getElementById("caption");
const author = document.getElementById("author");
const article = document.getElementById("article");
const errorTxt = document.querySelectorAll("#errorTxt");
const articles = document.getElementById("articles");
const preview = document.getElementById("file-ip-1-preview");
let blogArray = [];
let oldBlog = JSON.parse(window.localStorage.getItem("blog")) ?? [];
if (oldBlog.length > 0) {
  oldBlog?.forEach((item) => {
    blogArray.push(item);
  });
}
// previewing the cover image within the form
function showPreview(event) {
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    preview.src = src;
    preview.style.display = "block";
  }
}

// on submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log("button clicked");
  if (formValidation()) {
    // base data object
    const data = {
      id: "",
      cover: "",
      title: "",
      caption: "",
      author: "",
      article: "",
      posted: "",
      reads: "",
      comments: [],
    };
    // storing the data
    const acceptData = () => {
      data.id = Date.now();
      data.cover = URL.createObjectURL(image.files[0]);
      data.title = title.value;
      data.caption = caption.value;
      data.author = author.value;
      data.article = article.value;

      // getting today's date
      // let today = new Date();
      // let dd = String(today.getDate()).padStart(2, "0");
      // let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      // let yyyy = today.getFullYear();
      // let hr = today.getHours();
      // let min = today.getMinutes();

      // today = dd + "/" + mm + "/" + yyyy + " - " + hr + ":" + min;
      let today = Date.now();
      today = new Date(today).toDateString();
      data.posted = today;
      data.reads = 0;
      data.comments = 0;

      return data;
    };
    blogArray.push(acceptData());
    window.localStorage.setItem("blog", JSON.stringify(blogArray));
    title.value = "";
    caption.value = "";
    author.value = "";
    article.value = "";
    image.value = "";
    preview.style.display = "none";

    window.location.replace("../../pages/blogs/index.html");
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

// engine function which will do the basic check
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
