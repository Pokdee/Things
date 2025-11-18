import { addNewList, closeInput } from "./area";
import { getAreaName, addNewArea } from "./from";

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
//add New Area
const createNewArea = function (taskAreaCon) {
  getAreaName(taskAreaCon);
};
addNewArea(taskAreaCon, "Family");
addNewArea(taskAreaCon, "Work");
addNewArea(taskAreaCon, "Project");
addNewArea(taskAreaCon, "Desk");

const taskAreas = document.querySelector(".taskArea");

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

let data;
let notDragElements;
let midPointsArray;
let dragElementMidPoint;
taskAreaCon.addEventListener("dragstart", (e) => {
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
taskAreaCon.addEventListener("dragover", (e) => e.preventDefault());
taskAreaCon.addEventListener("drop", (e) => {
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
      taskAreaCon.insertAdjacentElement("afterbegin", data);
    }
  }
  data.classList.remove("dragging");
});

//
// addNewArea("Family", taskAreaCon);
export default nav;
