import {
  displayArea,
  newToDoInput,
  closeToDoInput,
  updateCheckedToDo,
} from "./toDoSection.js";

import savedDataKey from "./areaForm.js";
//
const inputToDoHtml = `<div class="formContainer">
     <span class="formCloseBtn">X</span>
    <form  action="" method="get" class="formToDo">
     <input type="checkbox" class="checkboxInput" name="checkbox"/>
     <input type="text" id="toDo"  class="inputToDo" autofocus autocomplete="off"/>
    </form>
      <textarea class="notesToDo" id="Notes" placeholder="Notes" ></textarea>
      </div>`;
//element for dashboard display
const toDoSection = document.createElement("section");
const toDoHeading = document.createElement("h2");
const projectUl = document.createElement("ul");
const toDoUl = document.createElement("ul");

//classes
toDoSection.classList.add("toDoSection");
toDoHeading.classList.add("toDoHeading");
projectUl.classList.add("projectUl");
toDoUl.classList.add("toDoUl");

//content

//add element
toDoSection.appendChild(toDoHeading);
toDoSection.appendChild(projectUl);
toDoSection.appendChild(toDoUl);

toDoUl.insertAdjacentHTML("afterend", inputToDoHtml);

//

//access area or to do and make input standby for new to do
const openArea = function (areaId) {
  displayArea(areaId, toDoUl);

  newToDoInput(toDoUl, areaId);
};

//close input form if no need
toDoSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("formCloseBtn")) {
    closeToDoInput();
  }
});

//check mark of finish todos
const doneToDo = function (areaId, savedToDos) {
  const toDoList = document.querySelectorAll(".toDoCheckbox");
  toDoList.forEach((checkBox) => {
    checkBox.addEventListener("change", (e) => {
      const label = checkBox.nextElementSibling;
      const labelId = label.getAttribute("id");
      const areaIdToDo = savedToDos[areaId];
      const savedToDoData = areaIdToDo[labelId];
      const checkedToDo = savedToDoData.checked;
      //

      if (checkedToDo) {
        label.classList.remove("checkedToDo");
      } else {
        label.classList.add("checkedToDo");
      }
      //update memory
      //get id from todo label

      updateCheckedToDo(areaId, labelId, savedToDos);
    });
  });
};

//export
export { openArea, toDoSection, doneToDo };
