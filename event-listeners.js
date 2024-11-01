import * as helper from "./helper.js";
import {
  saveLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
  loadLocalStorage,
} from "./localstorage.js";
import { loadCounters } from "./counters.js";

const tasks = [];

const tasksCounter = document.querySelector(".total-tasks p");
const completedCounter = document.querySelector(".completed-tasks p");

let totalTasks = 0;
let totalCompleted = 0;
let isProcessing = false;

export function loadTasks() {
  const todoList = document.querySelector(".todo-list");
  const completedList = document.querySelector(".completed-list");

  let sortedTasks = helper.sortList("nosort", tasks);

  loadLocalStorage(tasks);

  sortedTasks.forEach((item) => {
    const keySubstring = item[0].substring(0, 4);
    if (keySubstring === "todo") {
      todoList.insertAdjacentHTML(
        "beforeend",
        `<li class="todo-list-item" data-id=${item[0]}>
        <div class="list-item-container">
                  <div class="item-content">
                    <input type="checkbox" class="checkbox-completed" name="completed"/>
                    <p class="saved-item">${item[1]}</p>
                  </div>
                  <button class="primary edit-button">Edit</button>
                  </li>
        </div>`
      );
      totalTasks++;
      return;
    }

    if (keySubstring === "done") {
      completedList.insertAdjacentHTML(
        "beforeend",
        `<li class="todo-list-item" data-id=${item[0]}>
        <div class="list-item-container">
                  <div class="item-content">
                    <input type="checkbox" class="checkbox-completed" name="completed" checked/>
                    <p class="saved-item">${item[1]}</p>
                  </div>
                  <button class="primary edit-button">Edit</button>
                  </li>
        </div>`
      );
    }
    totalCompleted++;
    return;
  });

  loadCounters(totalTasks, totalCompleted);
}

export function addTask(input) {
  if (isProcessing) return;
  isProcessing = true;

  const editContainer = document.querySelector(".edit-container");
  let taskName = input.value;
  let taskDateTime = helper.getDateTime();

  if (taskName === "") {
    alert("Please enter a todo list name.");
    return;
  }

  tasks.push([`todo_${taskDateTime}`, taskName]);
  saveLocalStorage(`todo_${taskDateTime}`, taskName);

  addToDOM(taskDateTime, taskName);

  if (editContainer) {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
      button.classList.add("hidden");
    });
  }

  totalTasks++;
  updateDOMCounters();

  input.value = "";

  isProcessing = false;
}

export function editTask(event) {
  const currentEditButton = event.target;
  const listContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const addButton = document.querySelector(".add-button");
  const savedTask = helper.getPreviousSiblingsUntil(
    currentEditButton,
    "item-content"
  );

  disableButton([addButton, editButtons]);

  listContainer.insertAdjacentHTML(
    "afterend",
    `<div class="edit-container">
            <input type="text" class="edit-input" />
            <button class="success save-button">Save</button>
            <button class="secondary cancel-button">Cancel</button>
            <button class="danger delete-button">Delete</button>
        </div>`
  );

  listContainer.classList.add("hidden");

  const editInput = document.querySelector(".edit-input");
  const taskText = savedTask[0].querySelector(".saved-item").innerHTML;
  editInput.value = taskText;
}

export function saveTask(event) {
  const editContainer = event.target.parentNode;
  const editButton = event.target.parentNode.previousSibling;
  const addButton = document.querySelector(".add-button");
  const editButtons = document.querySelectorAll(".edit-button");
  const savedTaskContainer = editContainer.previousSibling.childNodes;

  updateSavedTask(event, savedTaskContainer);

  enableButton([addButton, editButtons]);
  editButton.classList.remove("hidden");
  editContainer.remove();
}

export function cancelEdit(event) {
  const editContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const addButton = document.querySelector(".add-button");

  enableButton([addButton, editButtons]);

  editContainer.previousSibling.classList.remove("hidden");
  editContainer.remove();
}

export function deleteTask(event) {
  const parentContainer = helper.getNthParentNode(event.target, 4);
  const listContainer = helper.getNthParentNode(event.target, 2);
  const editButtons = document.querySelectorAll(".edit-button");
  const addButton = document.querySelector(".add-button");

  if (parentContainer.classList.contains("inprogress-container")) totalTasks--;
  if (parentContainer.classList.contains("completed-container"))
    totalCompleted--;

  updateDOMCounters();

  deleteLocalStorage(listContainer.getAttribute("data-id"));
  enableButton([addButton, editButtons]);

  listContainer.remove();
}

export function updateTaskStatus(event) {
  if (isProcessing) return;
  isProcessing = true;

  const isChecked = event.target.hasAttribute("checked");

  if (isChecked) {
    updateToDraft(event);
    totalTasks++;
    totalCompleted--;
    updateDOMCounters();
    isProcessing = false;
    return;
  }

  updateToCompleted(event);
  totalTasks--;
  totalCompleted++;
  updateDOMCounters();

  isProcessing = false;
  return;
}

function updateDOMCounters() {
  tasksCounter.innerHTML = totalTasks;
  completedCounter.innerHTML = totalCompleted;
}

function addToDOM(id, name) {
  const todoList = document.querySelector(".todo-list");

  todoList.insertAdjacentHTML(
    "beforeend",
    `<li class="todo-list-item" data-id="todo_${id}">
        <div class="list-item-container">
                  <div class="item-content">
                    <input type="checkbox" class="checkbox-completed" name="completed"/>
                    <p class="saved-item">${name}</p>
                  </div>
                  <button class="primary edit-button">Edit</button>
                  </li>
        </div>`
  );
}

function updateToCompleted(event) {
  const taskContainer = helper.getNthParentNode(event.target, 3);
  const completedTasks = document.querySelector(".completed-list");
  const taskID = taskContainer.getAttribute("data-id");
  const storedValue = getLocalStorage(taskID);

  if (!storedValue) {
    console.error("No stored value found for task ID:", taskID);
    return;
  }

  tasks.push([`done_${taskID.substring(5)}`, storedValue]);

  taskContainer.setAttribute("data-id", `done_${taskID.substring(5)}`);

  const taskIndex = tasks.findIndex((task) => task[0] === taskID);

  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }

  localStorage.removeItem(taskID);
  saveLocalStorage(`done_${taskID.substring(5)}`, storedValue);

  event.target.setAttribute("checked", "");
  completedTasks.appendChild(taskContainer);
}

function updateToDraft(event) {
  const taskContainer = helper.getNthParentNode(event.target, 3);
  const taskID = taskContainer.getAttribute("data-id");
  const todoTasks = document.querySelector(".todo-list");
  const storedValue = getLocalStorage(taskID);

  if (!storedValue) {
    console.error("No stored value found for task ID:", taskID);
    return;
  }

  tasks.push([`todo_${taskID.substring(5)}`, storedValue]);

  taskContainer.setAttribute("data-id", `todo_${taskID.substring(5)}`);

  const taskIndex = tasks.findIndex((task) => task[0] === taskID);

  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }

  localStorage.removeItem(taskID);
  saveLocalStorage(`todo_${taskID.substring(5)}`, storedValue);

  event.target.removeAttribute("checked", "");
  todoTasks.appendChild(taskContainer);
}

function enableButton(buttons) {
  updateButtonState(buttons, removeClassAttribute);
}

function disableButton(buttons) {
  updateButtonState(buttons, setClassAttribute);
}

function updateButtonState(buttons, callback) {
  buttons.forEach((button) => {
    if (button instanceof NodeList) {
      button.forEach((singleButton) => {
        callback(singleButton);
      });
      return;
    }
    callback(button);
  });
}

function setClassAttribute(element) {
  element.classList.add("disabled");
  element.setAttribute("disabled", "");
}

function removeClassAttribute(element) {
  element.classList.remove("disabled");
  element.removeAttribute("disabled");
}

function getSavedTask(container) {
  let task;
  container.forEach((element) => {
    if (
      element.nodeType === Node.ELEMENT_NODE &&
      element.classList.contains("item-content")
    ) {
      task = element.querySelector(".saved-item");
    }
  });
  return task;
}

function updateSavedTask(event, container) {
  const parentContainer = helper.getNthParentNode(event.target, 2);
  const editContainer = event.target.parentNode;
  const editInput = document.querySelector(".edit-input");
  const taskID = parentContainer.getAttribute("data-id");

  let savedTask = getSavedTask(container);

  if (
    !tasks ||
    tasks.length === 0 ||
    !taskID ||
    !editInput ||
    !editInput.value
  ) {
    return;
  }

  saveLocalStorage(taskID, editInput.value);

  tasks.forEach((item) => {
    if (item[0] === taskID) {
      item[1] = editInput.value;
      return;
    }
  });

  savedTask.innerHTML = editInput.value;
  editContainer.querySelector(".edit-input").innerHTML = editInput.value;
}

export function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (event) => {
    if (event.target.matches(selector)) {
      callback(event);
    }
  });
}
