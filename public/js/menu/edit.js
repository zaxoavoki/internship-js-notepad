// Inserts bold tag between selection
normalElement.addEventListener("click", (e) => {
  setFontFormat("n");
});

boldElement.addEventListener("click", (e) => {
  setFontFormat("b");
});

// Inserts cursive tag between selection
cursiveElement.addEventListener("click", (e) => {
  setFontFormat("i");
});

// Inserts list
listElement.addEventListener("click", (e) => {
  if (mouseSelection) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    ul.appendChild(li);
    mouseSelection.range.insertNode(ul);
    countLinesNumber();
  }
});
