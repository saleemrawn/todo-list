import * as helper from "./helper.js";

const todoInput = document.querySelector(".todo-item");
const todoList = document.querySelector(".todo-list");
const itemCounter = document.querySelector(".tasks-counter span");

let itemID = 0;
let itemCount = 0;

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
                  <p class="saved-item">${savedTodo}</p>
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

    itemCount++;
    itemCounter.innerHTML = itemCount;

    todoInput.value = "";
  }
});

/* helper.addGlobalEventListener("click", ".edit-button", (event) => {
  const currentEditButton = event.target;
  const listItemContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const savedItemText = helper.getPreviousSiblingsUntil(
    currentEditButton,
    "saved-item"
  );

  listItemContainer.insertAdjacentHTML(
    "afterend",
    `<div class="edit-container">
            <input type="text" class="edit-input" />
            <button class="success save-button">Save</button>
            <button class="cancel-button">Cancel</button>
            <button class="danger delete-button">Delete</button>
        </div>`
  );

  listItemContainer.classList.add("hidden");

  currentEditButton.insertAdjacentHTML(
    "afterend",
    `<div class="edit-container">
            <input type="text" class="edit-input" />
            <button class="success save-button">Save</button>
            <button class="cancel-button">Cancel</button>
            <button class="danger delete-button">Delete</button>
        </div>`
  );

  editButtons.forEach((button) => {
    button.classList.add("hidden");
  });

  const editInput = document.querySelector(".edit-input");
  editInput.value = savedItemText[0].innerHTML;
}); */

helper.addGlobalEventListener("click", ".edit-button", (event) => {
  const currentEditButton = event.target;
  const listItemContainer = event.target.parentNode;
  const savedItemText = helper.getPreviousSiblingsUntil(
    currentEditButton,
    "saved-item"
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
  editInput.value = savedItemText[0].innerHTML;
});

helper.addGlobalEventListener("click", ".save-button", (event) => {
  const editContainer = event.target.parentNode;
  const editButtons = document.querySelectorAll(".edit-button");
  const editButton = event.target.parentNode.previousSibling;
  const editInput = document.querySelector(".edit-input");

  /* const savedItem = helper.getPreviousSiblingsUntil(
    editContainer,
    ".saved-item"
  ); */

  const listItemContainer = editContainer.previousSibling.childNodes;
  //console.log(savedItem);
  let savedItem;

  listItemContainer.forEach((element) => {
    if (
      element.nodeType === Node.ELEMENT_NODE &&
      element.classList.contains("saved-item")
    ) {
      savedItem = element;
    }
  });

  //console.log(savedItem);
  savedItem.innerHTML = editInput.value;

  editButton.classList.remove("hidden");
  editContainer.remove();

  editButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
});

/* helper.addGlobalEventListener("click", ".cancel-button", (event) => {
  const parentNode = event.target.parentNode;
  const editButton = parentNode.previousSibling;
  const editButtons = document.querySelectorAll(".edit-button");

  editButton.classList.remove("hidden");
  parentNode.remove();

  editButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
}); */

helper.addGlobalEventListener("click", ".cancel-button", (event) => {
  const editContainer = event.target.parentNode;
  editContainer.previousSibling.classList.remove("hidden");
  editContainer.remove();
});

helper.addGlobalEventListener("click", ".delete-button", (event) => {
  const parentNode = helper.getNthParentNode(event.target, 2);
  const editButtons = document.querySelectorAll(".edit-button");

  parentNode.remove();

  editButtons.forEach((button) => {
    button.classList.remove("hidden");
  });

  itemCount--;
  itemCounter.innerHTML = itemCount;
});
