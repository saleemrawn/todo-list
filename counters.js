const INCREMENT = "increment";
const DECREMENT = "decrement";
const TOTAL_TASK = "task";
const COMPLETED_TASK = "completed";

const tasksCounter = document.querySelector(".total-tasks p");
const completedCounter = document.querySelector(".completed-tasks p");

export function updateCounter(type, operator) {
  isValidTask(type);
  isValidOperator(operator);

  if (type === TOTAL_TASK) {
    totalTasks = updateValue(totalTasks, operator);
    updateCount(tasksCounter, totalTasks);
    return;
  }

  if (type === COMPLETED_TASK) {
    totalCompleted = updateValue(totalCompleted, operator);
    updateCount(completedCounter, totalCompleted);
    return;
  }
}

export function loadCounters(todo, completed) {
  updateCount(tasksCounter, todo);
  updateCount(completedCounter, completed);
}

function updateValue(counter, operator) {
  return operator === INCREMENT ? counter + 1 : counter - 1;
}

function updateCount(display, counter) {
  display.innerHTML = counter;
}

function isValidOperator(operator) {
  if (operator !== INCREMENT && operator !== DECREMENT) {
    console.error(
      `Invalid or missing argument: expected "${INCREMENT}" or "${DECREMENT}", received "${operator}"`
    );
    return;
  }
}

function isValidTask(type) {
  if (type !== TOTAL_TASK && type !== COMPLETED_TASK) {
    console.error(
      `Invalid or missing argument: expected "${TOTAL_TASK}" or "${COMPLETED_TASK}", received "${type}"`
    );
    return;
  }
}
