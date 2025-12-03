import savedDataKey from "./form";

//to Do Class
class ToDo {
  constructor(toDo, id, Done = false) {
    this.toDo = toDo;
    this.id = id;
    this.Done = Done;
  }
}

//

const displayTask = function (container, text, id, status = false) {
  const projectLi = document.createElement("li");
  const taskName = document.createElement("label");
  const taskCheckBox = document.createElement("input");

  //add class
  projectLi.classList.add("toDoLi");
  taskName.classList.add("toDoText");
  taskCheckBox.classList.add("toDoCheckbox");

  //add attribute
  taskCheckBox.setAttribute("type", "checkbox");
  taskCheckBox.setAttribute("id", `${text}`);
  taskName.setAttribute("for", `${text}`);
  taskName.setAttribute("id", id);

  //
  taskName.textContent = text;
  //
  projectLi.classList.add("toDoLi");
  projectLi.appendChild(taskCheckBox);
  projectLi.appendChild(taskName);
  container.appendChild(projectLi);
};

//function save new to do to localstorage
const saveToDo = function (areaId, toDo, id) {
  const savedItems = JSON.parse(localStorage.getItem(savedDataKey));
  const toDoOfAreaId = savedItems[areaId];
  let toDoData = new ToDo(toDo, id);
  toDoOfAreaId[id] = toDoData;
  savedItems[areaId] = toDoOfAreaId;

  const newDataToSave = JSON.stringify(savedItems);
  localStorage.setItem(savedDataKey, newDataToSave);
};

const closeToDoInput = function () {
  const inputField = document.getElementById("toDo");
  const formContainer = document.querySelector(".formContainer");
  formContainer.classList.remove("showForm");
  inputField.value = "";
};

//open area info to dashboard
const displayArea = function (areaId, container) {
  const area = document.getElementById(areaId);

  container.innerHTML = "";
  const toDoHeading = document.querySelector(".toDoHeading");
  //
  toDoHeading.textContent = area.getAttribute("id");

  const savedToDos = JSON.parse(localStorage.getItem(savedDataKey));

  //clear previous html of todo container
  if (savedToDos) {
    const toDoOfAreaId = savedToDos[areaId];
    Object.values(toDoOfAreaId).forEach((todo) => {
      displayTask(container, todo.toDo, todo.id, todo.Done);
    });
  }

  ///////
  newToDoInput(container, areaId);
};

//open form of new to do input

//try changing area id by area heading
let currentAreaId;
let newToDoId = 1;
const newToDoInput = function (container, areaId) {
  currentAreaId = areaId;
  const inputField = document.querySelector(".inputToDo");
  const formBox = document.querySelector(".formContainer");
  inputField.focus();

  //
  inputField.addEventListener("beforeinput", (e) => {
    if (e.inputType === "insertText") {
      formBox.classList.add("showForm");
    }
    if (e.inputType === "insertLineBreak") {
      e.preventDefault();
      if (inputField.value) {
        const newToDo = inputField.value;
        displayTask(container, newToDo, newToDoId);
        saveToDo(currentAreaId, newToDo, newToDoId);
        closeToDoInput();
        newToDoId++;
      }
    }
  });
};

export { displayArea, newToDoInput, closeToDoInput };
