const INCREMENT = "increment";
const DECREMENT = "decrement";
const TOTAL_TASK = "task";
const COMPLETED_TASK = "completed";

const tasksCounter = document.querySelector(".total-tasks p");
const completedCounter = document.querySelector(".completed-tasks p");

let totalTasks = 0;
let totalCompleted = 0;

export function updateCounter(type, operator) {
  isValidTask(type);
  isValidOperator(operator);

  if (type === TOTAL_TASK) {
    totalTasks = updateValue(totalTasks, operator);
    updateCounterDisplay(tasksCounter, totalTasks);
    return;
  }

  if (type === COMPLETED_TASK) {
    totalCompleted = updateValue(totalCompleted, operator);
    updateCounterDisplay(completedCounter, totalCompleted);
    return;
  }
}

function updateValue(counter, operator) {
  return operator === INCREMENT ? counter + 1 : counter - 1;
}

function updateCounterDisplay(display, counter) {
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
