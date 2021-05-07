// When choosing local file event
filereadInput.addEventListener("change", (e) => {
  const fileReader = new FileReader();
  fileReader.onload = (_) => {
    filename = e.target.files[0].name.split(".").slice(0, -1);
    filenameBlock.innerHTML = filename;
    editorBlock.innerHTML = fileReader.result;
  };
  fileReader.readAsText(e.target.files[0]);
});

// On open local file
fileOpenLocalElement.addEventListener("click", (e) => {
  if (validateFile()) {
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
fileOpenServerElement.addEventListener("click", (e) => {
  const cookies = getCookies();
  fileList.innerHTML = "";
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

  fileList.append(ul);
  fileList.style.display = "block";
});

// On saved files list
fileList.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") {
    e.target.style = "none";
    return;
  }
  const key = e.target.getAttribute("data-id");
  fetch(serverURI + "/download/" + key)
    .then((res) => res.json())
    .then((res) => {
      filename = res.filename;
      filenameBlock.innerHTML = filename;
      editorBlock.innerHTML = res.text;
    })
    .catch((e) => {
      showNotification("Can't open the note");
    });
});

// On New file options click
fileCreateElement.addEventListener("click", (e) => {
  if (editorBlock.innerHTML.trim() !== "") {
    const ans = confirm("Are you sure you want to discard all changes?");
    if (ans) {
      filename = defaultFilename;
      filenameBlock.innerHTML = filename;
      editorBlock.innerHTML = "";
      countLinesNumber();
    }
  }
});

// Save file (download) to the local computer
fileSaveLocallyElement.addEventListener("click", (e) => {
  if (validateFile()) {
    // Creates temporary link to be able to download text file
    const tmpLink = document.createElement("a");
    tmpLink.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(editorBlock.innerHTML)
    );
    tmpLink.setAttribute("download", filename);
    tmpLink.style.display = "none";
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
  }
});

// On file saving to the server
// send text to the server and get token as response
fileSaveServerElement.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateFile()) {
    fetch(serverURI + "/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename,
        text: editorBlock.innerHTML,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // store token in cookies
        setCookie(res.token + "." + filename, res.token + "." + filename, 365);
        showNotification("File was saved");
      })
      .catch((err) => {
        showNotification("File was not saved");
      });
  }
});

// On double click make file name block editable
filenameBlock.addEventListener("dblclick", (e) => {
  e.target.setAttribute("contenteditable", "true");
});

// When file name block lost focus set filename
filenameBlock.addEventListener("blur", (e) => {
  if (e.target.textContent.trim() === "") {
    e.target.innerHTML = filename;
  } else {
    e.target.innerHTML = e.target.textContent;
    filename = e.target.innerHTML;
  }
  e.target.setAttribute("contenteditable", "false");
});
