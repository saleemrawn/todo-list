import * as helper from "./helper.js";

const todoInput = document.querySelector(".todo-item");
const todoList = document.querySelector(".todo-list");

let itemID = 0;

todoInput.value = "";

helper.addGlobalEventListener("click", ".add-button", () => {
  const savedTodo = todoInput.value;
  const editContainer = document.querySelector(".edit-container");

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

    if (editContainer) {
      const editButtons = document.querySelectorAll(".edit-button");
      editButtons.forEach((button) => {
        button.classList.add("hidden");
      });
    }

    itemID++;
    todoInput.value = "";
  }
});

helper.addGlobalEventListener("click", ".edit-button", (event) => {
  const currentEditButton = event.target;
  const editButtons = document.querySelectorAll(".edit-button");
  const savedItemText = helper.getPreviousSiblingsUntil(
    currentEditButton,
    "saved-item"
  );

  currentEditButton.insertAdjacentHTML(
    "afterend",
    `<div class="edit-container">
            <input type="text" class="edit-input" />
            <button class="save-button">Save</button>
            <button class="cancel-button">Cancel</button>
            <button class="delete-button">Delete</button>
        </div>`
  );

  editButtons.forEach((button) => {
    button.classList.add("hidden");
  });

  const editInput = document.querySelector(".edit-input");
  editInput.value = savedItemText[0].innerHTML;
});

helper.addGlobalEventListener("click", ".save-button", (event) => {
  const editContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const editButton = event.target.parentNode.previousSibling;
  const editInput = document.querySelector(".edit-input");
  const savedItem = helper.getPreviousSiblingsUntil(
    editContainer,
    "saved-item"
  );

  savedItem[0].innerHTML = editInput.value;

  editButton.classList.remove("hidden");
  editContainer.remove();

  editButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
});

helper.addGlobalEventListener("click", ".cancel-button", (event) => {
  const parentNode = event.target.parentNode;
  const editButton = parentNode.previousSibling;
  const editButtons = document.querySelectorAll(".edit-button");

  editButton.classList.remove("hidden");
  parentNode.remove();

  editButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
});

helper.addGlobalEventListener("click", ".delete-button", (event) => {
  const parentNode = helper.getNthParentNode(event.target, 2);
  const editButtons = document.querySelectorAll(".edit-button");

  parentNode.remove();

  editButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
});
