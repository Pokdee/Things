import { displayArea, newToDoInput } from "./toDoSection.js";
//
const inputToDoHtml = `<div class="formContainer">
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

//access area or to do
const openArea = function (id) {
  displayArea(id);
  newToDoInput(toDoUl);
};

//export
export { openArea, toDoSection };
