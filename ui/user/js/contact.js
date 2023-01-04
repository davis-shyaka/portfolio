const form = document.getElementById("form");
const sender = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const mail = document.getElementById("mail");
const errorTxt = document.querySelectorAll("#errorTxt");
let mailArray = [];
let oldMail = JSON.parse(window.localStorage.getItem("mail")) ?? [];
if (oldMail.length > 0) {
  oldMail?.forEach((item) => {
    mailArray.push(item);
  });
}

// on submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log("button clicked");
  if (formValidation()) {
    // base data object
    const data = {
      id: "",
      sender: "",
      email: "",
      subject: "",
      mail: "",
      posted: "",
    };
    // storing the data
    const acceptData = () => {
      try {
        data.id = Date.now();
        data.sender = sender.value;
        data.email = email.value;
        data.subject = subject.value;
        data.mail = mail.value;

        // getting today's date
        let today = Date.now();
        today = new Date(today).toString();
        data.posted = today;

        return data;
      } catch (error) {
        console.log("Error while storing data in local storage:");
        console.log(error);
      }
    };
    mailArray.push(acceptData());
    window.localStorage.setItem("mail", JSON.stringify(mailArray));
    sender.value = "";
    email.value = "";
    subject.value = "";
    mail.value = "";
  }
});

// validate the form
let formValidation = () => {
  if (
    engine(sender, 0, "Name cannot be blank", errorTxt) &&
    engine(email, 1, "Email cannot be blank", errorTxt) &&
    engine(subject, 2, "Subject cannot be blank", errorTxt) &&
    engine(mail, 3, "Message cannot be blank", errorTxt)
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
