import { editorElem, rootElem, linesElem, filenameElem } from "./dom.js";
import { state, defaultFontSize } from "./config.js";
import { updateLineNumbers } from "./helpers.js";
import "./menu/file.js";
import "./menu/edit.js";
import "./menu/view.js";

// Initial setup
rootElem.style.fontSize = defaultFontSize + "px";
filenameElem.innerHTML = state.filename;
linesElem.innerHTML = "1";

// Save previous click event
editorElem.addEventListener("mouseup", () => {
  if (window.getSelection()) {
    state.selection = {
      range: window.getSelection().getRangeAt(0),
    };
  }
});

// On any key press event
editorElem.addEventListener("keydown", (e) => {
  setTimeout(() => {
    updateLineNumbers();
  });
});
