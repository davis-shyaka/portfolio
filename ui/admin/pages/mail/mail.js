const mail = document.getElementById("mail");
let mailData = JSON.parse(window.localStorage.getItem("mail")) ?? [];
mailData.forEach(({ id, sender, subject, posted }) => {
  mail.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
    <td data-label="From">${sender}</td>
    <td data-label="Subject">
      ${subject}
    </td>
    <td data-label="Publ. Date">${posted}</td>
    <td data-label="Action">
      <div class="actions">
        <a href="#"
          ><i id="edit" class="fa-solid fa-reply"></i
        ></a>
        <a href="#"
          >
          <i id="delete" data-id = ${id} class="fa-solid fa-trash delete-mail"></i>
        </a>
      </div>
    </td>
  </tr>
         
          `
  );
});

const deleteButtons = [...document.getElementsByClassName("delete-mail")];
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
      "mail",
      JSON.stringify(mailData.filter(({ id }) => id != deleteID))
    );
    location.reload();
  }
}
