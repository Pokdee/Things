const newTask = function (container, text) {
  const projectLi = document.createElement("li");
  const taskName = document.createElement("label");
  const taskCheckBox = document.createElement("input");

  //add class
  projectLi.classList.add("toDoLi");
  taskName.classList.add("toDoText");
  taskCheckBox.classList.add("toDoCheckbox");
  //
  taskCheckBox.setAttribute("type", "checkbox");
  taskName.textContent = text;
  //
  projectLi.classList.add("toDoLi");
  projectLi.appendChild(taskCheckBox);
  projectLi.appendChild(taskName);
  container.appendChild(projectLi);
};

const newToDoInput = function (container) {
  const inputField = document.getElementById("toDo");
  const formContainer = document.querySelector(".formContainer");
  inputField.style.display = "block";
  inputField.focus();

  inputField.addEventListener("beforeinput", (e) => {
    formContainer.classList.add("showForm");
    if (e.inputType === "insertLineBreak") {
      e.preventDefault();
      formContainer.classList.remove("showForm");
      newTask(container, inputField.value);
      inputField.value = "";
    }
  });
};

const closeToDoInput = function () {
  const inputField = document.getElementById("toDo");
  const formContainer = document.querySelector(".formContainer");
  formContainer.classList.remove("showForm");
  inputField.value = "";
  inputField.style.display = "none";
};

const displayArea = function (areaId) {
  const area = document.getElementById(areaId);
  const toDoHeading = document.querySelector(".toDoHeading");

  //
  toDoHeading.textContent = area.getAttribute("id");
};

export { displayArea, newToDoInput, closeToDoInput };
