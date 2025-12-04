import { displayArea, closeToDoInput, saveToDo } from "./toDoSection.js";
//
const inputToDoHtml = `<div class="formContainer">
     <span class="formCloseBtn">X</span>
    <form  action="" method="get" class="formToDo">
     <input type="checkbox" class="checkboxInput" name="checkbox"/>
     <input type="text" id="toDo"  class="inputToDo" autofocus autocomplete="off"/>
    </form>
      <textarea class="notesToDo" id="Notes" placeholder="Notes" ></textarea>
      </div>`;
//
const toDoSection = document.createElement("section");
const toDoHeading = document.createElement("h2");
const toDoUl = document.createElement("ul");

//classes
toDoSection.classList.add("toDoSection");
toDoHeading.classList.add("toDoHeading");
toDoUl.classList.add("toDoUl");

//content
// newTask(toDoUl);

//add element
toDoSection.appendChild(toDoHeading);
toDoSection.appendChild(toDoUl);
toDoUl.insertAdjacentHTML("afterend", inputToDoHtml);

//

//access area or to do and make input standby for new to do
const openArea = function (areaId) {
  displayArea(areaId, toDoUl);
  doneToDo(areaId);
  // newToDoInput(toDoUl, areaId);
};

//close input form if no need
toDoSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("formCloseBtn")) {
    closeToDoInput();
  }
});

//check mark of finish todos
const doneToDo = function (areaId) {
  const toDoList = document.querySelectorAll(".toDoCheckbox");
  toDoList.forEach((checkBox) => {
    checkBox.addEventListener("change", (e) => {
      const label = checkBox.nextElementSibling;
      const labelId = label.getAttribute("id");
      const checkedToDo = label.classList.contains("checkedToDo");
      //
      if (checkedToDo) {
        label.classList.remove("checkedToDo");
      } else {
        label.classList.add("checkedToDo");
        // saveToDo(areaId);
      }
    });
  });
};
//export
export { openArea, toDoSection, doneToDo };
