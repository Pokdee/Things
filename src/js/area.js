const inputTaskName = `<form  action="" method="get" class="inputForm">
      <input type="text" name="" id="taskName" class = "newTaskInput" minlength="3" autofocus/>
      <label class="inputCross"for="taskName">X</label>
    </form>`;

//close input form
const closeInput = function (inputForm, taskArea) {
  inputForm.remove();
  taskArea.classList.remove("inputOn");
};

//add new list to task area
const addList = function (taskName, taskArea) {
  const taskList = document.createElement("li");
  taskList.classList.add("taskList");
  taskList.textContent = taskName;
  taskArea.appendChild(taskList);
};
//input field to get new list to task Area
const getTaskName = function (taskArea) {
  taskArea.insertAdjacentHTML("beforeend", inputTaskName);
  const inputForm = document.querySelector(".inputForm");
  const inputField = document.getElementById("taskName");

  inputField.focus();
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const taskName = e.target.value;
      inputForm.remove();
      addList(taskName, taskArea);
      taskArea.classList.remove("inputOn");
    }
  });
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

//make area draggable

export { addNewList, closeInput };
