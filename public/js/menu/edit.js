import { normalElem, boldElem, cursiveElem, listElem } from "../dom.js";
import { setFontFormat, updateLineNumbers } from "../helpers.js";
import { state } from "../config.js";

normalElem.addEventListener("click", () => {
  setFontFormat("n");
});

boldElem.addEventListener("click", () => {
  setFontFormat("b");
});

cursiveElem.addEventListener("click", () => {
  setFontFormat("i");
});

// Inserts list
listElem.addEventListener("click", () => {
  if (state.selection) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    ul.appendChild(li);
    state.selection.range.insertNode(ul);
    updateLineNumbers();
  }
});
