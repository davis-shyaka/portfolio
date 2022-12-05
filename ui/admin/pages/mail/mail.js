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
      </div>
    </td>
  </tr>
         
          `
  );
});
