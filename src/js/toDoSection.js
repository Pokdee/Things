const newTask = function (container, text, areaId) {
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

  //save it to storage
  console.log(text);
  saveToDo(areaId, text);
};

//function save new to do to localstorage
const saveToDo = function (areaId, toDo) {
  const savedItems = JSON.parse(localStorage.getItem(areaId));
  const savedItemsLength = Object.keys(savedItems).length;

  savedItems[savedItemsLength] = toDo;

  const newDataToSave = JSON.stringify(savedItems);
  localStorage.setItem(areaId, newDataToSave);
};

const newToDoInput = function (toDoListContainer, areaId) {
  const inputField = document.getElementById("toDo");
  const formContainer = document.querySelector(".formContainer");
  inputField.style.display = "block";
  inputField.focus();

  inputField.addEventListener("beforeinput", (e) => {
    formContainer.classList.add("showForm");
    if (e.inputType === "insertLineBreak") {
      e.preventDefault();
      formContainer.classList.remove("showForm");
      newTask(toDoListContainer, inputField.value, areaId);
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

//open area info to dashboard
const displayArea = function (areaId) {
  const area = document.getElementById(areaId);
  const toDoHeading = document.querySelector(".toDoHeading");

  //
  toDoHeading.textContent = area.getAttribute("id");
};

export { displayArea, newToDoInput, closeToDoInput };
