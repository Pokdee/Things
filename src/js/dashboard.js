import { newTask } from "./task.js";

//
const projectSection = document.createElement("section");
const projectHeading = document.createElement("h2");
const projectUl = document.createElement("ul");

//classes
projectSection.classList.add("projectSection");
projectHeading.classList.add("projectHeading");
projectUl.classList.add("projectUl");

//content
projectHeading.textContent = "Project Heading";
newTask(projectUl);

//add element
projectSection.appendChild(projectHeading);
projectSection.appendChild(projectUl);

//export
export default projectSection;
