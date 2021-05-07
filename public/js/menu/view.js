// Zooming actions

zoomInElement.onclick = () => {
  rootElement.style.fontSize = parseInt(rootElement.style.fontSize) + 1 + "px";
};

zoomOutElement.onclick = () => {
  rootElement.style.fontSize = parseInt(rootElement.style.fontSize) - 1 + "px";
};

zoomResetElement.onclick = () => {
  rootElement.style.fontSize = defaultFontSize + "px";
};
