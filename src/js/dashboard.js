import { newTask } from "./toDoSection.js";
//
const inputToDoHtml = `<div class="formContainer">
    <form  action="" method="get" class="formToDo">
      <button class="btnCheckbox"></button>
      <input  id="toDo"  class = "inputToDo" autofocus autocapitalize="on"/>
      <span class = "inputHolder"></span>
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
const displayArea = function (areaId) {
  const area = document.getElementById(areaId);
  const toDoHeading = document.querySelector(".toDoHeading");
  const toDoUl = document.querySelector(".toDoUl");

  //
  toDoHeading.textContent = area.getAttribute("id");
};

const listenToDoInput = function () {
  const inputField = document.querySelector(".inputToDo");
  const textHolder = document.querySelector(".inputHolder");
  inputField.focus();
  let text = "";

  inputField.addEventListener("beforeinput", (e) => {
    if (e.inputType !== "insertLineBreak") {
      let letter = e.data;
      text += letter;
      textHolder.textContent = text;
    }
  });
};

//access area or to do
const openArea = function (id) {
  listenToDoInput();
  displayArea(id);
};

//export
export { openArea, toDoSection };
