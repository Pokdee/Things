const newTask = function (container) {
  for (let i = 0; i < 5; i++) {
    const projectLi = document.createElement("li");
    const taskName = document.createElement("label");
    const taskCheckBox = document.createElement("input");
    //
    taskCheckBox.setAttribute("type", "checkbox");
    taskCheckBox.setAttribute("name", `task ${i + 1}`);
    taskName.setAttribute("for", `task ${i + 1}`);
    taskName.textContent = `task ${i + 1}`;
    //
    projectLi.classList.add("projectLi");
    projectLi.appendChild(taskCheckBox);
    projectLi.appendChild(taskName);
    container.appendChild(projectLi);
  }
};

export { newTask };
