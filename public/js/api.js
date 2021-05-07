import { filenameElem, editorElem } from "./dom.js";
import { serverURI, state } from "./config.js";
import { showNotification, setCookie } from "./helpers.js";

// Download file from the server by its name
export function downloadFile(key) {
  fetch(serverURI + "/download/" + key)
    .then((res) => res.json())
    .then((res) => {
      state.filename = res.filename;
      filenameElem.innerHTML = state.filename;
      editorElem.innerHTML = res.text;
    })
    .catch(() => {
      showNotification("Can't open the note");
    });
}

// Upload file to the save
export function uploadFile() {
  fetch(serverURI + "/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: state.filename,
      text: editorElem.innerHTML,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      // store token in cookies
      setCookie(
        res.token + "." + state.filename,
        res.token + "." + state.filename,
        365
      );
      showNotification("File was saved");
    })
    .catch(() => {
      showNotification("File was not saved");
    });
}
