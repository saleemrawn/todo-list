export function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (event) => {
    if (event.target.matches(selector)) {
      callback(event);
    }
  });
}

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
    } else {
      prev = prev.previousElementSibling;
    }
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
    } else {
      next = next.nextElementSibling;
    }
  }
}
