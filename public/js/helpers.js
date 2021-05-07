// Set cookies with expiration date in days
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 3600 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Get all cookies in key-value representation
function getCookies() {
  return document.cookie.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    cookies[name.split(".")[0]] = value;
    return cookies;
  }, {});
}

// Checks if current editor text is empty or not
function validateFile() {
  const content = editorBlock.innerHTML;
  if (content.trim() === "") {
    showNotification("File is empty");
    return false;
  }
  return true;
}

// Show notification dialog message
function showNotification(text) {
  notificationBlock.innerHTML = text;
  notificationBlock.style.display = "block";
  setTimeout(() => {
    notificationBlock.innerHTML = "";
    notificationBlock.style.display = "none";
  }, 2000);
}

// For previously set mouse selection change font style
function setFontFormat(element) {
  if (mouseSelection) {
    const selection = mouseSelection.range;
    const selectedText = selection.extractContents();
    const el = document.createElement("span");
    el.classList.add(element);
    el.appendChild(selectedText);
    selection.insertNode(el);
  }
}

// Updates line numbering
function countLinesNumber() {
  // Use setTimeout without second argument as macroTask which will be executed after microTasks and synchonous code
  setTimeout(() => {
    linesBlock.innerHTML = editorBlock.childNodes.length < 2 ? "1" : "";
    for (
      let i = 0;
      i <
      editorBlock.childNodes.length -
        (editorBlock.childNodes.length < 2 ? 1 : 0);
      i++
    ) {
      linesBlock.innerHTML += i + 1 + "<br>";
    }
  });
}
