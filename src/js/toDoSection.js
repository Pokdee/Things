import savedDataKey from "./form";

import { doneToDo } from "./dashboard";

//to Do Class
const createToDo = function (id, toDo, checked = false) {
  return {
    id,
    toDo,
    checked,
  };
};

//

const displayTask = function (container, toDo) {
  console.log(toDo);
  const projectLi = document.createElement("li");
  const taskName = document.createElement("label");
  const taskCheckBox = document.createElement("input");

  //add class
  projectLi.classList.add("toDoLi");
  taskName.classList.add("toDoText");
  taskCheckBox.classList.add("toDoCheckbox");

  //add attribute
  taskCheckBox.setAttribute("type", "checkbox");
  taskCheckBox.setAttribute("id", `${toDo.toDo}`);
  if (toDo.checked) {
    taskCheckBox.checked = true;
    taskName.classList.add("checkedToDo");
  }
  taskName.setAttribute("for", `${toDo.toDo}`);
  taskName.setAttribute("id", toDo.id);

  //
  taskName.textContent = toDo.toDo;
  //
  projectLi.classList.add("toDoLi");
  projectLi.appendChild(taskCheckBox);
  projectLi.appendChild(taskName);
  container.appendChild(projectLi);
};

//function save new to do to localstorage
const saveToDo = function (areaId, toDo) {
  let savedItems = JSON.parse(localStorage.getItem(savedDataKey));
  let toDoOfAreaId = savedItems[areaId];

  //check if data with this id already exists

  toDoOfAreaId[toDo.id] = toDo;
  console.log(toDoOfAreaId);
  savedItems[areaId] = toDoOfAreaId;

  //if exists
  // let modifiedToDoData = createToDo(toDo.id, toDo.toDo, toDo.checked);
  // toDoOfAreaId[toDo.id] = modifiedToDoData;
  // savedItems[areaId] = modifiedToDoData;

  const newDataToSave = JSON.stringify(savedItems);
  localStorage.setItem(savedDataKey, newDataToSave);
};

//open area info to dashboard
const displayArea = function (areaId, container) {
  const area = document.getElementById(areaId);

  //clear previous html of todo container
  container.innerHTML = "";

  const toDoHeading = document.querySelector(".toDoHeading");
  //
  toDoHeading.textContent = area.getAttribute("id");

  let savedToDos = JSON.parse(localStorage.getItem(savedDataKey));
  let toDoOfAreaId = savedToDos[areaId];
  if (savedToDos && toDoOfAreaId) {
    // console.log(toDoOfAreaId);
    Object.values(toDoOfAreaId).forEach((todo) => {
      displayTask(container, todo);
    });
  }

  ///////new todo
  newToDoInput(container, areaId);

  ///checked finish todo
  doneToDo(areaId, savedToDos);
};

//open form of new to do input

let currentAreaId;
let newToDoId;
const newToDoInput = function (container, areaId) {
  currentAreaId = areaId;
  const inputField = document.querySelector(".inputToDo");
  const formBox = document.querySelector(".formContainer");
  const savedData = JSON.parse(localStorage.getItem(savedDataKey));
  const areaIdSavedData = savedData[currentAreaId];
  const areaIdSavedDataLength = Object.keys(areaIdSavedData).length;
  newToDoId = areaIdSavedData ? areaIdSavedDataLength : 0;

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
        const toDo = createToDo(newToDoId, newToDo);
        saveToDo(currentAreaId, toDo);
        displayTask(container, toDo);
        closeToDoInput();
      }
    }
  });
};

//update save todo data when checked
const updateCheckedToDo = function (areaId, todoId, savedToDos) {
  const areaIdSaveData = savedToDos[areaId];
  const toDoIdSavedData = areaIdSaveData[todoId];
  const checkedToDo = toDoIdSavedData.checked;
  if (checkedToDo) {
    toDoIdSavedData.checked = false;
    saveToDo(areaId, toDoIdSavedData);
  }
  if (!checkedToDo) {
    toDoIdSavedData.checked = true;
    console.log(toDoIdSavedData);
    saveToDo(areaId, toDoIdSavedData);
  }
};

const closeToDoInput = function () {
  const inputField = document.getElementById("toDo");
  const formContainer = document.querySelector(".formContainer");
  formContainer.classList.remove("showForm");
  inputField.value = "";
};

export {
  displayArea,
  newToDoInput,
  saveToDo,
  closeToDoInput,
  updateCheckedToDo,
};
