import { addNewList, changeAreaPosition, closeInput } from "./area";
import { getAreaName } from "./form";
import { openArea } from "./dashboard";

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
changeAreaPosition(taskAreaCon);

//access to do area and open to dashboard
nav.addEventListener("click", (e) => {
  if (e.target.classList.contains("taskCaption")) {
    const targetArea = e.target.parentElement;
    targetArea.classList.add("toDoOpen");
    const targetAreaId = targetArea.getAttribute("id");
    openArea(targetAreaId);
  }
});

export { nav, taskAreaCon };
