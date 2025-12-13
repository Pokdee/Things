import savedDataKey from "./areaForm";

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
  let toDoOfAreaId = savedItems[areaId].areaToDo;
  console.log(toDoOfAreaId);

  toDoOfAreaId[toDo.id] = toDo;

  console.log(savedItems);
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
  let toDoOfAreaId = savedToDos[areaId].areaToDo;
  if (savedToDos && toDoOfAreaId) {
    Object.values(toDoOfAreaId).forEach((todo) => {
      displayTask(container, todo);
    });
  }

  ///checked finish todo
  doneToDo(areaId, savedToDos);
};

//open form of new to do input

let beforeInputHandler = null;
const newToDoInput = function (container, areaId) {
  const inputField = document.querySelector(".inputToDo");
  const formBox = document.querySelector(".formContainer");
  inputField.focus();

  if (beforeInputHandler) {
    inputField.removeEventListener("beforeinput", beforeInputHandler);
  }

  beforeInputHandler = function (e) {
    if (e.inputType === "insertText") {
      formBox.classList.add("showForm");
    }
    if (e.inputType === "insertLineBreak") {
      e.preventDefault();
      //

      if (inputField.value) {
        ///////new todo
        let savedData = JSON.parse(localStorage.getItem(savedDataKey));
        let areaIdSavedData = savedData[areaId].areaToDo;
        let areaIdSavedDataLength = Object.keys(areaIdSavedData).length;
        let newToDoId = areaIdSavedData ? areaIdSavedDataLength : 0;
        //

        const newToDo = inputField.value;
        const toDo = createToDo(newToDoId, newToDo);

        saveToDo(areaId, toDo);
        displayTask(container, toDo);
        closeToDoInput();
      }
    }
  };

  inputField.addEventListener("beforeinput", beforeInputHandler);
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
  createToDo,
};
