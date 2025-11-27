const inputAreaName = `<input type="text" name="" id="taskName" class ="newAreaInput" minlength="3" placeholder="New Area" autocomplete='off' autofocus/>`;

//add Area to Nav bar
const addArea = function (container, areaName) {
  const taskArea = document.createElement("ul");
  const taskCaption = document.createElement("button");
  const plusTask = document.createElement("span");

  taskArea.classList.add("taskArea");
  taskCaption.classList.add("taskCaption");
  plusTask.classList.add("plusTask");

  //
  taskArea.setAttribute("draggable", "true");
  taskArea.setAttribute("id", areaName);

  //
  taskCaption.textContent = areaName;
  plusTask.textContent = "+";

  //
  taskCaption.appendChild(plusTask);
  taskArea.appendChild(taskCaption);
  container.appendChild(taskArea);
};

//save new area to local storage
const saveAreaToStorage = function (newArea) {
  const savedArea = JSON.parse(localStorage.getItem("SaveArea"));
  if (savedArea) {
    savedArea[newArea] = {};

    localStorage.setItem("SaveArea", JSON.stringify(savedArea));
  } else {
    const dataToSave = JSON.stringify({ [newArea]: {} });
    localStorage.setItem("SaveArea", dataToSave);
  }
};

//load save area when app open
const loadArea = function (taskAreaCon) {
  const savedArea = JSON.parse(localStorage.getItem("SaveArea"));
  if (savedArea) {
    Object.keys(savedArea).forEach((area) => {
      addArea(taskAreaCon, area);
    });
  }
};

//get name for new area
const getAreaName = function (taskAreaCon) {
  if (!taskAreaCon.classList.contains("inputOn")) {
    taskAreaCon.classList.add("inputOn");
    taskAreaCon.insertAdjacentHTML("beforeend", inputAreaName);
    const areaInput = document.querySelector(".newAreaInput");
    areaInput.focus();
    areaInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const areaName = areaInput.value;
        areaInput.remove();
        saveAreaToStorage(areaName);
        addArea(taskAreaCon, areaName);
        taskAreaCon.classList.remove("inputOn");
      }
    });
  }
};

export { getAreaName, addArea, loadArea };
