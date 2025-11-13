import { addNewList, closeInput } from "./task";
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
taskAreaCon.addEventListener("dragstart", (e) => {
  // data = e.dataTransfer.setData("text/html", e.target);
  data = e.target;
});
taskAreaCon.addEventListener("dragover", (e) => e.preventDefault());
taskAreaCon.addEventListener("drop", (e) => {
  const dropPlace = e.target.getBoundingClientRect();
  const midpoint = dropPlace.top + dropPlace.height / 2;

  console.log(e.clientY, "mouse");
  console.log(midpoint, "target");
  if (e.clientY < midpoint) {
    console.log("upper");
  } else {
    console.log("below");
  }
  const dropPosition = e.clientY < midpoint ? "beforebegin" : "afterend";
  e.target.parentElement.insertAdjacentElement(dropPosition, data);
});

//
// addNewArea("Family", taskAreaCon);
export default nav;
