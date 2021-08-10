// utils
const selectElement = (selector, parent = document) =>
  parent.querySelector(selector);
const createDOM = (element) => document.createElement(element);
//

const elForm = document.querySelector(".todo-form");
const elInput = document.querySelector(".form-control");
const eltodoList = document.querySelector(".todo-list");

const elAllBtn = document.querySelector(".all-btn");
const elCompletedBtn = document.querySelector(".completed-btn");
const elUncompletedBtn = document.querySelector(".uncompleted-btn");
const elClearBtn = document.querySelector(".clear-btn");

const elAllTodo = document.querySelector(".all-count");
const elCompletedTodo = document.querySelector(".complated-count");
const elUncompletedTodo = document.querySelector(".uncomplated-count");

const eltodoTemplate = document.querySelector("#todo-item--template").content;

const localToDos = JSON.parse(window.localStorage.getItem("todosList"));
let todos = localToDos || [];
// const todos = [];

// delete btn function
function deleteToDo(evt) {
  const toDoId = evt.target.dataset.todoId;
  const foundTodoIndex = todos.findIndex((list) => list.id == toDoId);
  todos.splice(foundTodoIndex, 1);

  window.localStorage.setItem("todosList", JSON.stringify(todos));
  renderTemplate(todos, eltodoList);
}

// checked function
function checkedToDo(evt) {
  const toDoId = evt.target.dataset.id_todo;
  const foundTodo = todos.find((list) => list.id == toDoId);
  foundTodo.isCompleted = !foundTodo.isCompleted;

  window.localStorage.setItem("todosList", JSON.stringify(todos));
  renderTemplate(todos, eltodoList);
}

let resultArr = [];
// clear btn function
function handleClearBtn() {
  todos = resultArr;
  eltodoList.innerHTML = null;
  window.localStorage.clear();
  renderTemplate(todos, eltodoList);
}

// all btn function
function handleAllBtn() {
  eltodoList.innerHTML = null;

  window.localStorage.setItem("todosList", JSON.stringify(todos));
  renderTemplate(todos, eltodoList);
}

// completed btn function
function handleCompletedBtn() {
  eltodoList.innerHTML = null;
  let completedArr = todos.filter((list) => list.isCompleted == true);

  window.localStorage.setItem("todosList", JSON.stringify(todos));
  renderTemplate(completedArr, eltodoList);
}

// uncompleted btn function
function handleUncompletedBtn() {
  eltodoList.innerHTML = null;
  let uncompletedArr = todos.filter((list) => list.isCompleted == false);

  window.localStorage.setItem("todosList", JSON.stringify(todos));
  renderTemplate(uncompletedArr, eltodoList);
}

// render
function renderTemplate(todoArr, element) {
  element.innerHTML = null;

  let completed = 0;
  let uncompleted = 0;

  todoArr.filter((list) => {
    if (list.isCompleted === true) {
      completed += 1;
    } else {
      uncompleted += 1;
    }
  });

  elAllTodo.textContent = completed + uncompleted;
  elCompletedTodo.textContent = completed;
  elUncompletedTodo.textContent = uncompleted;

  todoArr.forEach((list) => {
    const todoTemplate = eltodoTemplate.cloneNode(true);
    const elTodoItem = todoTemplate.querySelector(".todo-item-complete-text");
    const elTodoDeleteBtn = todoTemplate.querySelector(".todo-item-delete-btn");
    const elTodoChecked = todoTemplate.querySelector(".todo-input-complete");

    elTodoItem.textContent = list.text;
    elTodoDeleteBtn.dataset.todoId = list.id;
    elTodoChecked.dataset.id_todo = list.id;
    elTodoChecked.checked = list.isCompleted;

    if (list.isCompleted) {
      elTodoItem.classList.add("done");
    }

    elTodoDeleteBtn.addEventListener("click", deleteToDo);

    elTodoChecked.addEventListener("click", checkedToDo);

    elClearBtn.addEventListener("click", handleClearBtn);

    elAllBtn.addEventListener("click", handleAllBtn);

    elCompletedBtn.addEventListener("click", handleCompletedBtn);

    elUncompletedBtn.addEventListener("click", handleUncompletedBtn);

    element.appendChild(todoTemplate);
  });
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newInput = elInput.value.trim();

  const uniqueId = todos[todos.length - 1] ? todos[todos.length - 1].id : 0;

  todos.push({
    id: uniqueId + 1,
    text: newInput,
    isCompleted: false,
  });
  elInput.value = null;
  window.localStorage.setItem("todosList", JSON.stringify(todos));
  renderTemplate(todos, eltodoList);
});
renderTemplate(todos, eltodoList);
