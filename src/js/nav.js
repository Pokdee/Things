import {
  addNewList,
  changeAreaPosition,
  displayList,
  closeInput,
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

//load data
const loadArea = function (taskAreaCon) {
  const savedArea = JSON.parse(localStorage.getItem(savedDataKey));
  if (!savedArea) return;
  const areaList = Object.keys(savedArea);

  if (savedArea) {
    areaList.forEach((area) => {
      addArea(taskAreaCon, area);
      if (savedArea[area].areaProjects) {
        let projectList = Object.values(savedArea[area].areaProjects);
        projectList.forEach((project) => {
          let projectContainer = document.getElementById(area);
          displayList(project.toDo, projectContainer);
        });
      }
    });
  }
};
//add New Area
const createNewArea = function (taskAreaCon) {
  getAreaName(taskAreaCon);
};

//adding element to nav section
nav.appendChild(captionUl);
addNavChild(navListCaption, captionUl, "li", "cap_li");
nav.appendChild(taskAreaCon);

//add new area
btnNewTask.addEventListener("click", (e) => {
  createNewArea(taskAreaCon);
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

//access to do area or area's task and open to dashboard

const openAreaHandler = function (handler) {
  if (handler) {
    nav.removeEventListener("click", handler);
  }

  handler = function (e) {
    if (
      e.target.classList.contains("taskCaption") ||
      e.target.classList.contains("taskList")
    ) {
      let target = e.target.parentElement;
      if (!e.target.classList.contains("taskCaption")) {
        target = e.target;
      }
      const targetId = target.getAttribute("id");
      openArea(targetId);
    }
  };
  nav.addEventListener("click", handler);
};

let navOpenAreaHandler = null;

openAreaHandler(navOpenAreaHandler);

// localStorage.clear();

export { nav, taskAreaCon, loadArea };
