import { editorElem } from "./dom.js";
import { serverURI, state } from "./config.js";

// Download file from the server by its name
export function downloadFile(key) {
  return fetch(serverURI + "/download/" + key).then((res) => res.json());
}

// Upload file to the save
export function uploadFile() {
  return fetch(serverURI + "/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: state.filename,
      text: editorElem.innerHTML,
    }),
  }).then((res) => res.json());
}
