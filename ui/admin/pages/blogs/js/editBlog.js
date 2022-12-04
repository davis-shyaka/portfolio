const newURL = new URL(location.href);
// console.log(newURL);
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
const ourBlog = blogData.find(({ id }) => {
  return id == newURL.hash.replace("#", "");
});
console.log(ourBlog);
// const { cover, id, title, caption, author, posted, reads, article } = ourBlog;

let form = document.getElementById("form");
let { title, caption, author, article, image_uploads } = form;

// image_uploads.files = ourBlog.cover;
title.value = ourBlog.title;
caption.value = ourBlog.caption;
author.value = ourBlog.author;
article.value = ourBlog.article;

// previewing the cover image within the form
async function showPreview(event) {
  if (event.target.files.length > 0) {
    // let src = URL.createObjectURL(event.target.files[0]);
    preview.src = await readImage(event.target.files[0]);
    // preview.src = src;
    preview.style.display = "block";
  }
}

// read image function

function readImage(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (e) => {
      resolve(fileReader.result);
    });
  });
}

// handle submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm(form);
});

// form validation
const validateForm = (form) => {
  let isRequired = true;

  //   Check for required image
  if (form.image_uploads.value.trim() === "") {
    setInvalid(form.image_uploads, "Cover is required");
  } else {
    setSuccess(form.image_uploads);
  }

  // Check for Required title
  if (form.title.value.trim() === "") {
    setInvalid(form.title, "Title is required!");
    isRequired = false;
  } else {
    setSuccess(form.title);
  }

  // Check for Required caption
  if (form.caption.value.trim() === "") {
    setInvalid(form.caption, "Caption is required!");
    isRequired = false;
  } else {
    setSuccess(form.caption);
  }

  // Check for Required author
  if (form.author.value.trim() === "") {
    setInvalid(form.author, "Author is required!");
    isRequired = false;
  } else {
    setSuccess(form.author);
  }

  // Check for Required article
  if (form.article.value.trim() === "") {
    setInvalid(form.article, "Article is Required!");
    isRequired = false;
  } else if (form.article.value.length < 50) {
    setInvalid(form.article, "Article must be at least 50 characters!");
    isRequired = false;
  } else {
    setSuccess(form.article);
  }

  return isRequired;
};

// Set for Success Input Value
const setSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const formAlert = formControl.querySelector(".error");
  formAlert.innerHTML = "";
};

// Set for Invalid Input Value
const setInvalid = (input, message) => {
  const formControl = input.parentElement;
  const formAlert = formControl.querySelector(".error");
  formControl.className = "form-control invalid";
  formAlert.innerHTML = message;
};
