import "../css/style.css";
import { nav, taskAreaCon } from "./nav.js";
import { btnNewTask } from "./nav.js";
import { toDoSection } from "./dashboard.js";
import { loadArea } from "./nav.js";

//
const body = document.querySelector("body");
const aside = document.createElement("aside");
const main = document.createElement("main");

//save data key

//
aside.classList.add("aside");
main.classList.add("main");
//
body.appendChild(aside);
body.appendChild(main);
aside.appendChild(nav);
nav.insertAdjacentElement("afterend", btnNewTask);
main.appendChild(toDoSection);

//load old data
loadArea();
