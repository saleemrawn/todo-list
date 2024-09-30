import * as helper from "./helper.js";

const todoInput = document.querySelector(".todo-item");
const todoList = document.querySelector(".todo-list");
const itemCounter = document.querySelector(".total-tasks p");

let itemID = 0;
let totalTasks = 0;
let totalCompleted = 0;

todoInput.value = "";

helper.addGlobalEventListener("click", ".add-button", () => {
  const savedTodo = todoInput.value;
  const editContainer = document.querySelector(".edit-container");

  if (todoInput.value == "") {
    alert("Please enter a todo list name.");
  } else {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<li class="todo-list-item" data-id="${itemID}">
        <div class="list-item-container">
                  <div class="item-content">
                    <input type="checkbox" class="checkbox-completed" name="completed"/>
                    <p class="saved-item">${savedTodo}</p>
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

    itemID++;

    totalTasks++;
    itemCounter.innerHTML = totalTasks;

    todoInput.value = "";
  }
});

helper.addGlobalEventListener("click", ".edit-button", (event) => {
  const currentEditButton = event.target;
  const listItemContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const addButton = document.querySelector(".add-button");

  editButtons.forEach((button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", "");
  });

  addButton.classList.add("disabled");
  addButton.setAttribute("disabled", "");

  const savedItemText = helper.getPreviousSiblingsUntil(
    currentEditButton,
    "item-content"
  );

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

  const editInput = document.querySelector(".edit-input");
  editInput.value = savedItemText[0].querySelector(".saved-item").innerHTML;
});

helper.addGlobalEventListener("click", ".save-button", (event) => {
  const editContainer = event.target.parentNode;
  const editButton = event.target.parentNode.previousSibling;
  const editInput = document.querySelector(".edit-input");

  let savedItem;

  const listItemContainer = editContainer.previousSibling.childNodes;
  listItemContainer.forEach((element) => {
    if (
      element.nodeType === Node.ELEMENT_NODE &&
      element.classList.contains("item-content")
    ) {
      let itemContent = element;
      savedItem = itemContent.querySelector(".saved-item");
    }
  });

  savedItem.innerHTML = editInput.value;
  editContainer.querySelector(".edit-input").innerHTML = editInput.value;

  const editButtons = document.querySelectorAll(".edit-button");
  editButton.classList.remove("hidden");
  editContainer.remove();

  const addButton = document.querySelector(".add-button");
  addButton.classList.remove("disabled");
  addButton.removeAttribute("disabled", "");

  editButtons.forEach((button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  });
});

helper.addGlobalEventListener("click", ".cancel-button", (event) => {
  const editContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");

  editButtons.forEach((button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  });

  const addButton = document.querySelector(".add-button");
  addButton.classList.remove("disabled");
  addButton.removeAttribute("disabled", "");

  editContainer.previousSibling.classList.remove("hidden");
  editContainer.remove();
});

helper.addGlobalEventListener("click", ".delete-button", (event) => {
  const parentNode = helper.getNthParentNode(event.target, 2);
  const parentListContainer = helper.getNthParentNode(event.target, 4);
  const editButtons = document.querySelectorAll(".edit-button");
  const completedCount = document.querySelector(".completed-tasks p");

  editButtons.forEach((button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  });

  const addButton = document.querySelector(".add-button");
  addButton.classList.remove("disabled");
  addButton.removeAttribute("disabled", "");

  itemCounter.innerHTML = totalTasks;
  if (parentListContainer.classList.contains("inprogress-container")) {
    totalTasks--;
    itemCounter.innerHTML = totalTasks;
  } else {
    totalCompleted--;
    completedCount.innerHTML = totalCompleted;
  }

  parentNode.remove();
});

helper.addGlobalEventListener("click", ".checkbox-completed", (event) => {
  const completedCount = document.querySelector(".completed-tasks p");
  const taskCompleted = helper.getNthParentNode(event.target, 3);
  const todoTaskList = document.querySelector(".todo-list");
  const completedTaskList = document.querySelector(".completed-list");

  if (event.target.hasAttribute("checked")) {
    event.target.removeAttribute("checked");
    totalCompleted--;
    completedCount.innerHTML = totalCompleted;

    totalTasks++;
    itemCounter.innerHTML = totalTasks;
    completedCount.innerHTML = totalCompleted;
    todoTaskList.appendChild(taskCompleted);
  } else {
    event.target.setAttribute("checked", "");
    totalCompleted++;
    totalTasks--;
    itemCounter.innerHTML = totalTasks;
    completedCount.innerHTML = totalCompleted;
    completedTaskList.appendChild(taskCompleted);
  }
});
