import { addNewArea, addNewList } from "./task";
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
const addChild = function (captionArr, parentElement, newElement, className) {
  for (let i = 0; i < captionArr.length; i++) {
    const childElement = document.createElement(newElement);
    childElement.textContent = captionArr[i];
    childElement.classList.add(className);
    parentElement.appendChild(childElement);
  }
};

//

nav.appendChild(captionUl);
addChild(navListCaption, captionUl, "li", "cap_li");
nav.appendChild(taskAreaCon);
//
addNewArea("Family ", taskAreaCon);
//add task to area
taskAreaCon.addEventListener("click", (e) => {
  if (e.target.classList.contains("plusTask")) {
    const targetArea = e.target.parentElement;
    addNewList(targetArea);
  }
});

//
// addNewArea("Family", taskAreaCon);
export default nav;
