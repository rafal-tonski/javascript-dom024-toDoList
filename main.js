const newTasksForm = document.querySelector("form.new-tasks");
const info = document.querySelector("h1.info");
const newTask = document.querySelector("input.new-tasks");
const tasksList = document.querySelector("ul.tasks-list");

const searchTask = document.querySelector("input.search-task");

const tasksListHolder = [];

const handleSearchTask = ({ target }) => {
  const newTaskListHolder = tasksListHolder.filter(
    (task) => task.includes(target.value) === true
  );
  tasksList.innerHTML = "";

  createNewTasksList(newTaskListHolder);
};

const renderInfo = () => {
  tasksListHolder.length
    ? (info.textContent = `Pozostałe zadania do wykonania : ${tasksListHolder.length}`)
    : (info.textContent = `Możesz leżeć i pachnieć.`);
};

const removeTask = ({ target }) => {
  const txt = target.parentNode.firstChild.textContent;
  const index = tasksListHolder.findIndex((item) => item === txt);
  tasksListHolder.splice(index, 1);
  tasksList.innerHTML = "";
  searchTask.value = "";
  createNewTasksList(tasksListHolder);
  renderInfo();
};

const createNewTasksList = (list) => {
  list.forEach((task) => {
    const newLi = document.createElement("li");
    const newBtn = document.createElement("button");
    newBtn.textContent = "X";
    newBtn.addEventListener("click", removeTask);
    newLi.textContent = `${task}`;
    newLi.appendChild(newBtn);
    tasksList.appendChild(newLi);
    renderInfo();
  });
};

const addNewTaskToList = (e) => {
  e.preventDefault();
  if (newTask.value.trim()) {
    tasksList.innerHTML = "";
    const task = newTask.value;
    tasksListHolder.push(task);
    createNewTasksList(tasksListHolder);
    newTask.value = "";
    searchTask.value = "";
  } else {
    searchTask.value = "";

    createNewTasksList(tasksListHolder);
  }
};

newTasksForm.addEventListener("submit", addNewTaskToList);
searchTask.addEventListener("input", handleSearchTask);
renderInfo();
