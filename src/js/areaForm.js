const savedDataKey = "SavedData";

///
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
  taskCaption.setAttribute("id", areaName);
  taskCaption.setAttribute("dataType", "Area");

  //
  taskCaption.textContent = areaName;
  plusTask.textContent = "+";

  //
  taskCaption.appendChild(plusTask);
  taskArea.appendChild(taskCaption);
  container.appendChild(taskArea);
};

const createNewAreaData = function (areaName) {
  return {
    areaProjects: {},
    areaToDo: {},
  };
};

//save new area to local storage
const saveAreaToStorage = function (newArea) {
  const savedArea = JSON.parse(localStorage.getItem(savedDataKey));
  if (savedArea) {
    savedArea[newArea] = createNewAreaData(newArea);

    localStorage.setItem(savedDataKey, JSON.stringify(savedArea));
  } else {
    const dataToSave = JSON.stringify({
      [newArea]: createNewAreaData(newArea),
    });
    localStorage.setItem(savedDataKey, dataToSave);
  }
};

//load save area when app open

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

export default savedDataKey;

export { getAreaName, addArea };
