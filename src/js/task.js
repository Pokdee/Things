const newTaskForm = `<form action="" method="get" class="inputForm">
      <input type="text" name="" id="taskName" class = "newTaskInput" autofocus/>
    </form>`;

//add task to list
const addList = function (taskName, taskArea) {
  const taskList = document.createElement("li");
  taskList.classList.add("taskList");
  taskList.textContent = taskName;
  // const taskArea = eventTarget.parentElement;
  // console.log(taskArea);
  taskArea.appendChild(taskList);
};
//add and remove InputField
const getTaskName = function (taskArea) {
  taskArea.insertAdjacentHTML("beforeend", newTaskForm);
  const inputField = document.getElementById("taskName");
  inputField.focus();
  let taskName;
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskName = e.target.value;
      addList(taskName, taskArea);
      inputField.remove();
    }
  });
};

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

const addNewList = function (eventTarget) {
  const taskArea = eventTarget.parentElement;
  getTaskName(taskArea, eventTarget);
};

export { addNewArea, addNewList };
