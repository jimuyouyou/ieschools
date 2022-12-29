// Promise memo debounce throttle curry

let debounceTimer;
const debounce = (callback, time) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, time);
}

let startNextInterval;
const throttle = (callback, time) => {
  if (!startNextInterval) return;

  startNextInterval = false;
  setTimeout(() => {
    callback();
    startNextInterval = true;
  }, time);
}

