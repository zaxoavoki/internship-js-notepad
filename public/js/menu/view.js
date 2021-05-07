import {
  zoomInElem,
  zoomOutElem,
  zoomResetElem,
  helpBtnElem,
  helpElem,
  rootElem,
} from "../dom.js";
import { defaultFontSize } from "../config.js";

zoomInElem.onclick = () => {
  rootElem.style.fontSize = parseInt(rootElem.style.fontSize) + 1 + "px";
};

zoomOutElem.onclick = () => {
  rootElem.style.fontSize = parseInt(rootElem.style.fontSize) - 1 + "px";
};

zoomResetElem.onclick = () => {
  rootElem.style.fontSize = defaultFontSize + "px";
};

helpBtnElem.addEventListener("click", () => {
  helpElem.style.display = helpElem.show ? "none" : "block";
  helpElem.show = !helpElem.show;
});
