const newTaskForm = `<form  action="" method="get" class="inputForm">
      <input type="text" name="" id="taskName" class = "newTaskInput" minlength="3" autofocus/>
      <label class="inputCross"for="taskName">X</label>
    </form>`;

//add new list to task area
const addList = function (taskName, taskArea) {
  const taskList = document.createElement("li");
  taskList.classList.add("taskList");
  taskList.textContent = taskName;
  taskArea.appendChild(taskList);
};
//input field to get new list to task Area
const getTaskName = function (taskArea) {
  taskArea.insertAdjacentHTML("beforeend", newTaskForm);
  const inputForm = document.querySelector(".inputForm");
  const inputField = document.getElementById("taskName");

  // const inputForm = inputField.parentElement;
  console.log(inputForm);
  inputField.focus();
  let taskName;
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskName = e.target.value;
      addList(taskName, taskArea);
      inputForm.remove();
      taskArea.classList.remove("inputOn");
    }
  });
};

//add new area list

const addNewAreaSection = function () {
  console.log("new section");
};

//add New task Area with a Caption
const addNewArea = function (taskName, container) {
  const taskArea = document.createElement("ul");
  const taskCaption = document.createElement("button");
  const plusTask = document.createElement("span");

  taskArea.classList.add("taskArea");
  taskCaption.classList.add("taskCaption");
  plusTask.classList.add("plusTask");

  taskCaption.textContent = taskName;
  plusTask.textContent = "+";

  taskCaption.appendChild(plusTask);
  container.appendChild(taskArea);
  taskArea.appendChild(taskCaption);
};
///

//function attach to event listener to call open input field function
const addNewList = function (eventTarget) {
  const taskArea = eventTarget.parentElement;
  if (!taskArea.classList.contains("inputOn")) {
    taskArea.classList.add("inputOn");
    getTaskName(taskArea);
  }
};

export { addNewArea, addNewList, addNewAreaSection };
