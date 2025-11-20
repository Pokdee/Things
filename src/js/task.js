// const newTask = function (container) {
//   for (let i = 0; i < 5; i++) {
//     const projectLi = document.createElement("li");
//     const taskName = document.createElement("label");
//     const taskCheckBox = document.createElement("input");
//     //
//     taskCheckBox.setAttribute("type", "checkbox");
//     taskCheckBox.setAttribute("name", `task ${i + 1}`);
//     taskName.setAttribute("for", `task ${i + 1}`);
//     taskName.textContent = `task ${i + 1}`;
//     //
//     projectLi.classList.add("toDoLi");
//     projectLi.appendChild(taskCheckBox);
//     projectLi.appendChild(taskName);
//     container.appendChild(projectLi);
//   }
// };

const displayArea = function (areaId) {
  const area = document.getElementById(areaId);
  console.log(area);
  const toDoHeading = document.querySelector(".toDoHeading");
  const toDoUl = document.querySelector(".toDoUl");

  //
  toDoHeading.textContent = area.getAttribute("id");
};

//access area or to do
const openArea = function (id) {
  displayArea(id);
};

export { openArea };
