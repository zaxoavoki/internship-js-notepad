const defaultFontSize = 16;
const defaultFilename = "Untitled";
const serverURI = "http://localhost:3000";

let mouseSelection = null;
let filename = defaultFilename;

// Root elements
const rootElement = document.querySelector(":root");
const linesBlock = document.getElementById("lines");
const editorBlock = document.getElementById("editor");
const filenameBlock = document.getElementById("filename");
const fileList = document.getElementById("local-files");
const filereadInput = document.getElementById("fileread-input");
const notificationBlock = document.getElementById("notification");

// View menu elements
const helpBlock = document.getElementById("help-btn");
const helpElement = document.getElementById("help");
const zoomInElement = document.getElementById("zoom-in");
const zoomOutElement = document.getElementById("zoom-out");
const zoomResetElement = document.getElementById("zoom-reset");

// Edit menu elements
const normalElement = document.getElementById("text-normal");
const boldElement = document.getElementById("text-bold");
const cursiveElement = document.getElementById("text-cursive");
const listElement = document.getElementById("text-list");

// File menu elements
const fileCreateElement = document.getElementById("file-new");
const fileOpenLocalElement = document.getElementById("file-open-loc");
const fileOpenServerElement = document.getElementById("file-open-ser");
const fileSaveLocallyElement = document.getElementById("file-save-loc");
const fileSaveServerElement = document.getElementById("file-save-ser");

// Initial setup
linesBlock.innerHTML = "1";
rootElement.style.fontSize = defaultFontSize + "px";
filenameBlock.innerHTML = filename;

// Show message box
helpBlock.addEventListener("click", (e) => {
  helpElement.style.display = helpElement.show ? "none" : "block";
  helpElement.show = !helpElement.show;
});

// Save previous click event
editorBlock.addEventListener("mouseup", (e) => {
  if (window.getSelection()) {
    mouseSelection = {
      range: window.getSelection().getRangeAt(0),
    };
  }
});

// On any key press event
editorBlock.addEventListener("keydown", (e) => {
  countLinesNumber();
});
