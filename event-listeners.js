import * as helper from "./helper.js";
import { updateCounter } from "./counters.js";

export function addTask(input, list) {
  const editContainer = document.querySelector(".edit-container");
  let taskName = input.value;

  if (taskName === "") {
    alert("Please enter a todo list name.");
    return;
  }

  list.insertAdjacentHTML(
    "beforeend",
    `<li class="todo-list-item">
        <div class="list-item-container">
                  <div class="item-content">
                    <input type="checkbox" class="checkbox-completed" name="completed"/>
                    <p class="saved-item">${taskName}</p>
                  </div>
                  <button class="primary edit-button">Edit</button>
                  </li>
        </div>`
  );

  if (editContainer) {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
      button.classList.add("hidden");
    });
  }

  updateCounter("task", "increment");
  input.value = "";
}

export function editTask(event) {
  const currentEditButton = event.target;
  const listItemContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const addButton = document.querySelector(".add-button");
  const savedTask = helper.getPreviousSiblingsUntil(
    currentEditButton,
    "item-content"
  );

  disableButton([addButton, editButtons]);

  listItemContainer.insertAdjacentHTML(
    "afterend",
    `<div class="edit-container">
            <input type="text" class="edit-input" />
            <button class="success save-button">Save</button>
            <button class="secondary cancel-button">Cancel</button>
            <button class="danger delete-button">Delete</button>
        </div>`
  );

  listItemContainer.classList.add("hidden");

  const taskText = savedTask[0].querySelector(".saved-item").innerHTML;
  setEditInputValue(taskText);
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
  const parentNode = helper.getNthParentNode(event.target, 2);
  const parentListContainer = helper.getNthParentNode(event.target, 4);
  const editButtons = document.querySelectorAll(".edit-button");
  const addButton = document.querySelector(".add-button");

  const updateCounters = (container) => {
    const counterType = container.classList.contains("inprogress-container")
      ? "task"
      : "completed";
    updateCounter(counterType, "decrement");
  };

  updateCounters(parentListContainer);
  enableButton([addButton, editButtons]);
  parentNode.remove();
}

export function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (event) => {
    if (event.target.matches(selector)) {
      callback(event);
    }
  });
}

export function updateTaskStatus(event) {
  const taskCompleted = helper.getNthParentNode(event.target, 3);
  const todoTaskList = document.querySelector(".todo-list");
  const completedTaskList = document.querySelector(".completed-list");
  const isCompleted = event.target.hasAttribute("checked");

  const updateCounters = (taskAction, completedAction) => {
    updateCounter("task", taskAction);
    updateCounter("completed", completedAction);
  };

  if (isCompleted) {
    event.target.removeAttribute("checked");
    todoTaskList.appendChild(taskCompleted);
    updateCounters("increment", "decrement");
    return;
  }
  event.target.setAttribute("checked", "");
  completedTaskList.appendChild(taskCompleted);
  updateCounters("decrement", "increment");
}

function setEditInputValue(task) {
  const editInput = document.querySelector(".edit-input");
  editInput.value = task;
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
  const editContainer = event.target.parentNode;
  const editInput = document.querySelector(".edit-input");

  let savedTask = getSavedTask(container);

  savedTask.innerHTML = editInput.value;
  editContainer.querySelector(".edit-input").innerHTML = editInput.value;
}
