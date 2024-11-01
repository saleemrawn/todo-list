import { addGlobalEventListener, loadTasks } from "./event-listeners.js";
import {
  addTask,
  editTask,
  saveTask,
  cancelEdit,
  deleteTask,
  updateTaskStatus,
} from "./event-listeners.js";

(function () {
  const todoInput = document.querySelector(".todo-item");

  loadTasks();

  addGlobalEventListener("click", ".add-button", () => {
    addTask(todoInput);
  });

  addGlobalEventListener("click", ".edit-button", (event) => {
    editTask(event);
  });

  addGlobalEventListener("click", ".save-button", (event) => {
    saveTask(event);
  });

  addGlobalEventListener("click", ".cancel-button", (event) => {
    cancelEdit(event);
  });

  addGlobalEventListener("click", ".delete-button", (event) => {
    deleteTask(event);
  });

  addGlobalEventListener("click", ".checkbox-completed", (event) => {
    updateTaskStatus(event);
  });
})();
