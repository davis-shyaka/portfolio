const newURL = new URL(location.href);
// console.log(newURL);
let blogData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
const ourBlog = blogData.find(({ id }) => {
  return id == newURL.hash.replace("#", "");
});

if (newURL.hash.includes("#")) {
  console.log("i am here");
}

let preview = document.getElementById("file-ip-1-preview");
let form = document.getElementById("form");
let { title, caption, author, article, image_uploads } = form;

// previewing the cover image within the form
async function showPreview(event) {
  if (event.target.files.length > 0) {
    preview.src = await readImage(event.target.files[0]);
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
preview.style.display = "block";
preview.src = ourBlog.cover;
title.value = ourBlog.title;
caption.value = ourBlog.caption;
author.value = ourBlog.author;
article.value = ourBlog.article;

// handle submit
form.addEventListener("submit", (e) => {
  let { title, caption, author, article } = form;
  e.preventDefault();
  if (validateForm(form)) {
    const updatedBlog = blogData.map((blog) => {
      if (blog.id === ourBlog.id) {
        // console.log("they match");
        return {
          ...blog,
          cover: preview.src,
          title: title.value,
          author: author.value,
          caption: caption.value,
          article: article.value,
          updatedAt: Date.now(),
        };
      }
      return blog;
    });

    localStorage.setItem("blog", JSON.stringify(updatedBlog));
    window.location.replace("/ui/admin/pages/blogs/index.html");
  }
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
