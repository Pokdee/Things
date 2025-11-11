import "../css/style.css";
import nav from "./nav.js";
import form from "./from.js";
import { btnNewTask } from "./nav.js";
//
const body = document.querySelector("body");
const aside = document.createElement("aside");
const main = document.createElement("main");
//
aside.classList.add("aside");
main.classList.add("main");
//
body.appendChild(aside);
body.appendChild(main);
aside.appendChild(nav);
nav.insertAdjacentElement("afterend", btnNewTask);
