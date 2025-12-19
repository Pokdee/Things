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
const saveToDo = function (areaId, elementId, toDo, elementType) {
  let savedItems = JSON.parse(localStorage.getItem(savedDataKey));
  let toDoOfAreaId;
  if (elementType === "Area") {
    toDoOfAreaId = savedItems[areaId].areaToDo;
  } else {
    toDoOfAreaId = savedItems[areaId].areaProjects[elementId];
  }

  toDoOfAreaId[toDo.id] = toDo;

  const newDataToSave = JSON.stringify(savedItems);
  localStorage.setItem(savedDataKey, newDataToSave);
};

//open area info to dashboard
const displayArea = function (areaId, elementId, elementType, container) {
  //clear previous html of todo container

  container.innerHTML = "";

  const toDoHeading = document.querySelector(".toDoHeading");
  //

  let savedToDos = JSON.parse(localStorage.getItem(savedDataKey));
  let toDoOfId;
  toDoHeading.textContent = elementType === "Area" ? areaId : elementId;

  if (elementType === "Area") {
    toDoOfId = savedToDos[areaId].areaToDo;
  } else {
    toDoOfId = savedToDos[areaId].areaProjects[elementId];
  }
  if (savedToDos && toDoOfId) {
    Object.values(toDoOfId).forEach((todo) => {
      displayTask(container, todo);
    });
  }

  ///checked finish todo
  doneToDo(areaId, elementId, elementType, savedToDos);
};

//open form of new to do input

let beforeInputHandler = null;
const newToDoInput = function (container, areaId, elementId, elementType) {
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
        let areaIdSavedData = savedData[areaId];
        let storageLocation;
        if (elementType === "Area") {
          storageLocation = areaIdSavedData.areaToDo;
        } else {
          storageLocation = areaIdSavedData.areaProjects[elementId];
        }
        let storageLocationLength = Object.keys(storageLocation).length;
        let newToDoId = areaIdSavedData ? storageLocationLength : 0;
        //

        const newToDo = inputField.value;
        const toDo = createToDo(newToDoId, newToDo);

        saveToDo(areaId, elementId, toDo, elementType);
        displayTask(container, toDo);
        closeToDoInput();
      }
    }
  };

  inputField.addEventListener("beforeinput", beforeInputHandler);
};

//update save todo data when checked
const updateCheckedToDo = function (
  areaId,
  elementId,
  elementType,
  todoId,
  areaData
) {
  console.log(areaData);

  let storageLocation;
  if (elementType === "Area") {
    storageLocation = areaData.areaToDo;
  } else {
    storageLocation = areaData.areaProjects[elementId];
  }

  const elementSavedData = storageLocation[todoId];
  const checkedToDo = elementSavedData.checked;
  if (checkedToDo) {
    elementSavedData.checked = false;
    saveToDo(areaId, elementId, elementSavedData, elementType);
  }
  if (!checkedToDo) {
    elementSavedData.checked = true;
    saveToDo(areaId, elementId, elementSavedData, elementType);
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
