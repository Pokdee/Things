import { displayArea, newToDoInput, closeToDoInput } from "./toDoSection.js";
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

//access area or to do
const openArea = function (id) {
  displayArea(id);
  toDoSection.addEventListener("click", (e) => {
    newToDoInput(toDoUl);
  });
};

toDoSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("formCloseBtn")) {
    closeToDoInput();
  }
});

//export
export { openArea, toDoSection };
