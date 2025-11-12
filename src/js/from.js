const inputAreaName = `<input type="text" name="" id="taskName" class ="newAreaInput" minlength="3" placeholder="New Area" autofocus/>`;

//add New Area with a name
const addNewArea = function (container, areaName) {
  const taskArea = document.createElement("ul");
  const taskCaption = document.createElement("button");
  const plusTask = document.createElement("span");
  taskArea.classList.add("taskArea");
  taskCaption.classList.add("taskCaption");
  plusTask.classList.add("plusTask");
  taskCaption.textContent = areaName;
  plusTask.textContent = "+";
  taskCaption.appendChild(plusTask);
  container.appendChild(taskArea);
  taskArea.appendChild(taskCaption);
};

//get name for new area
const getAreaName = function (taskAreaCon) {
  if (!taskAreaCon.classList.contains("inputOn")) {
    taskAreaCon.classList.add("inputOn");
    taskAreaCon.insertAdjacentHTML("afterbegin", inputAreaName);
    const areaInput = document.querySelector(".newAreaInput");
    areaInput.focus();
    areaInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const areaName = areaInput.value;
        areaInput.remove();
        addNewArea(taskAreaCon, areaName);
        taskAreaCon.classList.remove("inputOn");
      }
    });
  }
};

export { getAreaName };
