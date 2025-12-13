import savedDataKey from "./areaForm";
import { createToDo } from "./toDoSection";

const inputTaskName = `<form  action="" method="get" class="inputForm">
      <input type="text" name="" id="taskName" class = "newTaskInput" minlength="3" autocomplete='off' autofocus/>
      <button class="inputCross" >X</button>
    </form>`;

//close input form
const closeInput = function (inputForm, taskArea) {
  inputForm.remove();
  taskArea.classList.remove("inputOn");
};

//save new list to its area storage
const saveList = function (project, area) {
  let savedData = JSON.parse(localStorage.getItem(savedDataKey));
  let areaId = area.getAttribute("id");
  let areaIdSavedData = savedData[areaId];
  let areaIdProject = areaIdSavedData.areaProjects;
  let areaIdProjectLength = Object.keys(areaIdProject)?.length;
  let projectId = areaIdProject ? areaIdProjectLength : 0;

  let newProject = createToDo(projectId, project);

  areaIdProject[newProject.id] = newProject;

  localStorage.setItem(savedDataKey, JSON.stringify(savedData));
};
//add new list to task area
const displayList = function (taskName, taskArea) {
  const taskList = document.createElement("li");

  taskList.classList.add("taskList");

  taskList.setAttribute("id", taskName);
  taskList.setAttribute("dataType", "Project");
  //
  taskList.textContent = taskName;
  //
  taskArea.appendChild(taskList);
};
//input field to get new list to task Area
const getTaskName = function (taskArea) {
  taskArea.insertAdjacentHTML("beforeend", inputTaskName);
  const inputForm = document.querySelector(".inputForm");
  const inputField = document.getElementById("taskName");

  inputField.focus();
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const taskName = e.target.value;
      inputForm.remove();
      displayList(taskName, taskArea);
      saveList(taskName, taskArea);
      taskArea.classList.remove("inputOn");
    }
  });
};

///

//add new list to area
const addNewList = function (eventTarget) {
  const taskArea = eventTarget.parentElement;
  if (!taskArea.classList.contains("inputOn")) {
    taskArea.classList.add("inputOn");
    getTaskName(taskArea);
  }
};

//make area draggable
const changeAreaPosition = function (container) {
  let data;
  let notDragElements;
  let midPointsArray;
  let dragElementMidPoint;
  container.addEventListener("dragstart", (e) => {
    data = e.target;
    const dataRect = data.getBoundingClientRect();
    dragElementMidPoint = data.top + data.height / 2;
    data.classList.add("dragging");
    const areaArray = [...document.querySelectorAll(".taskArea")];

    notDragElements = areaArray.filter(
      (area) => !area.classList.contains("dragging")
    );
    midPointsArray = notDragElements.map((area) => {
      let areaRect = area.getBoundingClientRect();
      let areaMid = areaRect.top + areaRect.height / 2;
      return areaMid;
    });
  });

  container.addEventListener("dragover", (e) => e.preventDefault());
  container.addEventListener("drop", (e) => {
    if (
      e.target.classList.contains("taskAreaCon") ||
      e.target.classList.contains("taskArea")
    ) {
      if (!midPointsArray.length > 1) {
        const midpoint = midPointsArray[0];
        const target = notDragElements[0];
        const dropPosition = e.clientY < midpoint ? "beforebegin" : "afterend";
        target.insertAdjacentElement(dropPosition, data);
      }
      let midPointLestThanMouseY = midPointsArray.filter(
        (point) => e.clientY > point
      );
      let upperAreaIndex = midPointsArray.indexOf(midPointLestThanMouseY.pop());
      let upperArea = notDragElements[upperAreaIndex];
      if (upperArea) {
        upperArea.insertAdjacentElement("afterend", data);
      } else {
        container.insertAdjacentElement("afterbegin", data);
      }
    }
    data.classList.remove("dragging");
  });
};

export { addNewList, closeInput, changeAreaPosition, displayList };
