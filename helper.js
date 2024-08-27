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
  let siblings = [];
  let prev = element.previousElementSibling;

  while (prev) {
    if (selector && prev.classList.contains(selector)) break;
    siblings.push(prev);
    prev = prev.previousElementSibling;
  }
  return siblings;
}

export function getNextSiblingsUntil(element, selector) {
  const siblings = [];
  const next = element.nextElementSibling;

  while (next) {
    if (selector && next.matches(selector)) break;
    siblings.push(next);

    next = next.nextElementSibling;
  }
  return siblings;
}
