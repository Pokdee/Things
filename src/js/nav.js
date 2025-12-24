import {
  addNewList,
  changeAreaPosition,
  displayList,
  closeInput,
  removeToDo,
} from "./area";
import { getAreaName, addArea } from "./areaForm";
import { openArea } from "./dashboard";
import savedDataKey from "./areaForm";

//
const nav = document.createElement("nav");
const captionUl = document.createElement("ul");
const taskAreaCon = document.createElement("div");
export const btnNewTask = document.createElement("button");
//
//area delete button
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
//
const navListCaption = [
  "Inbox",
  "Today",
  "Upcoming",
  "Anytime",
  "Someday",
  "Logbook",
];

//classes
nav.classList.add("nav");
captionUl.classList.add("cap_ul");
taskAreaCon.classList.add("taskAreaCon");
deleteBtn.classList.add("deleteArea");
btnNewTask.classList.add("btnNewTask");
//
//new task btn
btnNewTask.textContent = "New Task";

//function;
//add ul list to nav
const addNavChild = function (
  captionArr,
  parentElement,
  newElement,
  className
) {
  for (let i = 0; i < captionArr.length; i++) {
    const childElement = document.createElement(newElement);
    childElement.textContent = captionArr[i];
    childElement.classList.add(className);
    parentElement.appendChild(childElement);
  }
};

//adding element to nav section
nav.appendChild(captionUl);
addNavChild(navListCaption, captionUl, "li", "cap_li");
nav.appendChild(taskAreaCon);
nav.appendChild(deleteBtn);

//load data
const loadArea = function () {
  const savedArea = JSON.parse(localStorage.getItem(savedDataKey));
  if (!savedArea) return;
  const areaList = Object.keys(savedArea);

  taskAreaCon.innerHTML = "";
  if (savedArea) {
    areaList.forEach((area) => {
      addArea(taskAreaCon, area);

      let projectContainer = document.querySelector(
        `#${area}[dataType='Area']`
      );

      if (savedArea[area].areaProjects) {
        let projectList = Object.keys(savedArea[area].areaProjects);

        projectList.forEach((project) => {
          displayList(project, projectContainer);
        });
      }
    });
  }
};

//add new area
btnNewTask.addEventListener("click", (e) => {
  getAreaName(taskAreaCon);
});

//add task to area
taskAreaCon.addEventListener("click", (e) => {
  if (e.target.classList.contains("plusTask")) {
    const targetArea = e.target.parentElement;
    addNewList(targetArea);
  }
  if (e.target.classList.contains("inputCross")) {
    const inputForm = e.target.parentElement;
    const taskArea = inputForm.parentElement;
    closeInput(inputForm, taskArea);
  }
});

//change area position by drag and drop
changeAreaPosition(taskAreaCon);

//delete area or task
const deleteAreaHandler = function (handler) {
  if (handler) {
    taskAreaCon.removeEventListener("contextmenu", handler);
  }

  handler = removeToDo;
  taskAreaCon.addEventListener("contextmenu", handler);
};

let deleteTask = null;
deleteAreaHandler(deleteTask);

// remove delete btn when click on right click on other location when delete is on

//access to do area or area's task and open to dashboard

const openAreaHandler = function (handler) {
  if (handler) {
    taskAreaCon.removeEventListener("click", handler);
  }

  handler = function (e) {
    if (
      e.target.classList.contains("taskCaption") ||
      e.target.classList.contains("taskList")
    ) {
      const area = e.target.parentElement;
      const targetId = e.target.getAttribute("id");
      const targetType = e.target.getAttribute("datatype");
      openArea(area, targetId, targetType);
    }
  };

  taskAreaCon.addEventListener("click", handler);
};

let navOpenAreaHandler = null;

openAreaHandler(navOpenAreaHandler);

// localStorage.clear();

export { nav, taskAreaCon, loadArea };
