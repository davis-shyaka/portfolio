// const commentsDOM = document.getElementById("comments");
// let commentsData = JSON.parse(window.localStorage.getItem("blog")) ?? [];
// commentsData.forEach(({ id, comments }) => {
//   commentsDOM.insertAdjacentHTML(
//     "afterbegin",
//     `
//     <tr>
//                     <td data-label="From">Reigen Arataka</td>
//                     <td data-label="Comment">
//                       reigen@spiritsandsuch.consultation is now my company
//                     </td>
//                     <td data-label="Article">Mob Psycho 100</td>
//                     <td data-label="Publ. Date">28/11/2022</td>
//                     <td data-label="Action">
//                       <div class="actions">
//                         <a href="#"
//                           ><i id="edit" class="fa-solid fa-reply"></i
//                         ></a>
//                         <a href="#"
//                           ><i id="delete" class="fa-solid fa-trash"></i
//                         ></a>
//                       </div>
//                     </td>
//                   </tr>

//           `
//   );
// });

// const deleteButtons = [...document.getElementsByClassName("delete-comments")];
// // console.log(deleteButtons);
// deleteButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const deleteID = e.target.dataset.id;
//     deletePost(deleteID);
//   });
// });

// function deletePost(deleteID) {
//   if (confirm("Are you sure?")) {
//     localStorage.setItem(
//       "comments",
//       JSON.stringify(commentsData.filter(({ id }) => id != deleteID))
//     );
//     location.reload();
//   }
// }
