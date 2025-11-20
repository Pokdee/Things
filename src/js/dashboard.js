import { newTask } from "./task.js";
//
const inputToDoHtml = `<form  action="" method="get" class="formToDo">
      <input type="text" name="" id="taskName" class = "inputToDo" minlength="3"  autofocus/>
      <textarea class="notesToDo" id="Notes" placeholder="Notes" ></textarea>
    </form>`;
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

//export
export default toDoSection;
