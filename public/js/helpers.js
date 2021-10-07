import { notificationElem, linesElem, editorElem } from "./dom.js";
import { state } from "./config.js";

// Set cookies with expiration date in days
export function setCookie(name, value, days) {
  const date = new Date(Date.now() + days * 24 * 3600 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Get all cookies in key-value representation
export function getCookies() {
  return document.cookie.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    cookies[name.split(".")[0]] = value;
    return cookies;
  }, {});
}

// Checks if current editor text is empty or not
export function isEmpty() {
  return editorElem.innerHTML.trim() === "";
}

// Show notification dialog message
export function showNotification(text, delay = 2000) {
  notificationElem.innerHTML = text;
  notificationElem.style.display = "block";
  setTimeout(() => {
    notificationElem.innerHTML = "";
    notificationElem.style.display = "none";
  }, delay);
}

// For previously set mouse selection change font style
export function setFontFormat(elem) {

  if (state.selection.range) {
 
    const selection = state.selection.range;
    const selectedText = selection.extractContents();
    const el = document.createElement("span");
    el.classList.add(elem);
    el.appendChild(selectedText);
  const arr=el.querySelectorAll("span");
  for(let i=0;i<arr.length;i++)
  {
    arr[i].classList.remove('n');
    arr[i].classList.remove('b');
    arr[i].classList.remove('i');
    arr[i].classList.add(elem);
  }
    selection.insertNode(el);
  }
}

// Updates line numbering
export function updateLineNumbers() {
  // Use setTimeout without second argument as macroTask
  // which will be executed after queue of microTasks and synchonous code
  const cond = editorElem.childNodes.length < 2 ? "1" : "";
  linesElem.innerHTML = cond;
  for (
    let i = 0;
    i <
    editorElem.childNodes.length -
      cond +
      (editorElem.innerHTML.match(/<li>/g) || []).length;
    i++
  ) {
    linesElem.innerHTML += i + 1 + "<br>";
  }
}
