export function saveLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function updateLocalStorage(key) {
  const existing = localStorage.getItem(key);
  localStorage.setItem(key, existing);
}

export function getLocalStorage(key) {
  if (key) {
    const item = localStorage.getItem(key);
    return item;
  }
  console.error("Invalid or missing argument for getLocalStorage()");
}

export function loadLocalStorage(array) {
  const items = { ...localStorage };

  for (const [key, value] of Object.entries(items)) {
    array.push([key, value]);
  }
}

export function deleteLocalStorage(key) {
  if (!key) return console.error("Invalid key: deleteLocalStorageItem");
  localStorage.removeItem(key);
}
