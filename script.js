import * as helper from "./helper.js";

const todoInput = document.querySelector(".todo-item");
const addButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");
//const editButton = document.querySelectorAll(".edit-button");
//const deleteButton = document.querySelectorAll(".delete-button");
//const cancelButton = document.querySelectorAll(".cancel-button");

let itemID = 0;

todoInput.value = "";

helper.addGlobalEventListener("click", ".add-button", () => {
  const savedTodo = todoInput.value;
  if (todoInput.value == "") {
    alert("Please enter a todo list name.");
  } else {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<li data-id="${itemID}">
                  <p class="saved-item">${savedTodo}</p>
                  <button class="edit-button">Edit</button>
                  </li>`
    );
    itemID++;
    todoInput.value = "";
  }
});

helper.addGlobalEventListener("click", ".edit-button", (event) => {
  let currentButton = event.target;
  let savedItemText = helper.getPreviousSiblingsUntil(
    currentButton,
    "saved-item"
  );

  currentButton.insertAdjacentHTML(
    "afterend",
    `<div class="edit-container">
            <input type="text" class="edit-input" />
            <button class="save-button">Save</button>
            <button class="cancel-button">Cancel</button>
            <button class="delete-button">Delete</button>
        </div>`
  );
  currentButton.classList.add("hidden");

  let editInput = document.querySelector(".edit-input");
  editInput.value = savedItemText[0].innerHTML;
});

helper.addGlobalEventListener("click", ".save-button", (event) => {
  let editContainer = event.target.parentNode;
  let editButton = event.target.parentNode.previousSibling;
  let editInput = document.querySelector(".edit-input");
  let savedItem = helper.getPreviousSiblingsUntil(editContainer, "saved-item");

  savedItem[0].innerHTML = editInput.value;

  editButton.classList.remove("hidden");
  editContainer.remove();
});

helper.addGlobalEventListener("click", ".cancel-button", (event) => {
  let parentNode = event.target.parentNode;
  let editButton = parentNode.previousSibling;

  editButton.classList.remove("hidden");
  parentNode.remove();
});

helper.addGlobalEventListener("click", ".delete-button", (event) => {
  const parentNode = helper.getNthParentNode(event.target, 2);
  parentNode.remove();
});
