const ASCENDING = "ascending";
const DESCENDING = "descending";
const NOSORT = "nosort";

export function getNthParentNode(element, n) {
  return n === 0 ? element : getNthParentNode(element.parentNode, n - 1);
}

export function getPreviousSiblingsUntil(element, selector) {
  const className = selector.startsWith(".") ? selector.substring(1) : selector;

  let siblings = [];
  let prev = element.previousElementSibling;

  while (prev) {
    if (prev.classList.contains(className)) {
      siblings.push(prev);
      return siblings;
    }
    prev = prev.previousElementSibling;
  }
}

export function getNextSiblingsUntil(element, selector) {
  const className = selector.startsWith(".") ? selector.subString(1) : selector;

  let siblings = [];
  let next = element.nextElementSibling;

  while (next) {
    if (next.classList.contains(className)) {
      siblings.push(next);
      return siblings;
    }
    next = next.nextElementSibling;
  }
}

export function sortList(ordering, array) {
  if (ordering === ASCENDING) {
    array.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    return array;
  }

  if (ordering === DESCENDING) {
    array.sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });
    return array;
  }

  if (ordering === NOSORT) return array;

  if (
    ordering !== ASCENDING &&
    ordering !== DESCENDING &&
    ordering !== NOSORT
  ) {
    console.error(
      `Invalid or missing argument: expected ${ASCENDING},  ${DESCENDING} or ${NOSORT} , received "${ordering}"`
    );
  }
}

export function getDateTime() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.getTime();

  return `${day}_${month}_${year}_${time}`;
}
