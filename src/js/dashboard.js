import { newTask } from "./toDoSection.js";
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
const displayArea = function (areaId) {
  const area = document.getElementById(areaId);
  const toDoHeading = document.querySelector(".toDoHeading");
  const toDoUl = document.querySelector(".toDoUl");

  //
  toDoHeading.textContent = area.getAttribute("id");
};

const listenToDoInput = function () {
  const inputField = document.getElementById("toDo");
  const textHolder = document.querySelector(".inputHolder");
  const formContainer = document.querySelector(".formContainer");
  inputField.style.display = "block";
  inputField.focus();

  inputField.addEventListener("beforeinput", (e) => {
    formContainer.classList.add("showForm");
    if (e.inputType === "insertLineBreak") {
      e.preventDefault();
      formContainer.classList.remove("showForm");
      console.log(inputField.value);
      newTask(toDoUl, inputField.value);
      inputField.value = "";
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
