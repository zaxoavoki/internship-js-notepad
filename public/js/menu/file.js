import {
  filereadInput,
  filenameElem,
  editorElem,
  fileOpenLocalElem,
  fileOpenServerElem,
  fileListElem,
  fileCreateElem,
  fileSaveLocallyElem,
  fileSaveServerElem,
} from "../dom.js";
import { state, defaultFilename } from "../config.js";
import {
  isEmpty,
  updateLineNumbers,
  getCookies,
  showNotification,
} from "../helpers.js";
import { downloadFile, uploadFile } from "../api.js";

// When choosing local file event
filereadInput.addEventListener("change", (e) => {
  const fileReader = new FileReader();
  fileReader.onload = (_) => {
    state.filename = e.target.files[0].name.split(".").slice(0, -1);
    filenameElem.innerHTML = state.filename;
    editorElem.innerHTML = fileReader.result;
  };
  fileReader.readAsText(e.target.files[0]);
});

// On open local file
fileOpenLocalElem.addEventListener("click", () => {
  if (!isEmpty()) {
    const ans = confirm("Do you want to discard changes?");
    if (!ans) {
      showNotification("Save your file first!");
      return;
    }
    filereadInput.click();
  } else {
    filereadInput.click();
  }
});

// On open file from the server
fileOpenServerElem.addEventListener("click", () => {
  const cookies = getCookies();
  fileListElem.innerHTML = "";
  const ul = document.createElement("ul");
  for (const [_, value] of Object.entries(cookies)) {
    if (!value) {
      // If there is no any saved yet then show message
      const p = document.createElement("p");
      p.innerHTML = "There is not any saved notebook yet";
      ul.appendChild(p);
      continue;
    }
    const li = document.createElement("li");
    li.innerHTML = value.split(".")[1];
    li.setAttribute("data-id", value);
    ul.appendChild(li);
  }
  fileListElem.append(ul);
  fileListElem.style.display = "block";
});

// On saved files list
fileListElem.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") {
    e.target.style = "none";
    return;
  }
  downloadFile(e.target.getAttribute("data-id"));
});

// On New file options click
fileCreateElem.addEventListener("click", () => {
  if (editorElem.innerHTML.trim() !== "") {
    const ans = confirm("Are you sure you want to discard all changes?");
    if (ans) {
      state.filename = defaultFilename;
      filenameElem.innerHTML = state.filename;
      editorElem.innerHTML = "";
      updateLineNumbers();
    }
  }
});

// Save file (download) to the local computer
fileSaveLocallyElem.addEventListener("click", () => {
  if (!isEmpty()) {
    // Creates temporary link to be able to download text file
    const tmpLink = document.createElement("a");
    tmpLink.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(editorElem.innerHTML)
    );
    tmpLink.setAttribute("download", state.filename);
    tmpLink.style.display = "none";
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
  } else {
    showNotification("File is empty");
  }
});

// On file saving to the server
// send text to the server and get token as response
fileSaveServerElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isEmpty()) {
    uploadFile();
  } else {
    showNotification("File is empty");
  }
});

// On double click make file name block editable
filenameElem.addEventListener("dblclick", (e) => {
  e.target.setAttribute("contenteditable", "true");
});

// When file name block lost focus set filename
filenameElem.addEventListener("blur", (e) => {
  if (e.target.textContent.trim() === "") {
    e.target.innerHTML = state.filename;
  } else {
    e.target.innerHTML = e.target.textContent;
    state.filename = e.target.innerHTML;
  }
  e.target.setAttribute("contenteditable", "false");
});
