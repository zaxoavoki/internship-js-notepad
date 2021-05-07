const crypto = require("crypto"); // built-in module
const cors = require("cors");
const express = require("express");
const { readFileSync, writeFileSync } = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for uploading text file with generating unique token
app.post("/upload", (req, res) => {
  const { filename, text } = req.body;
  if (filename === "" || text === "") {
    return res.status(402).json({ error: "Invalid data" });
  }
  // this function is cryptographically secure as API says
  // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
  const randomFileId = crypto.randomBytes(32).toString("hex");
  writeFileSync(`./files/${randomFileId}.${filename}.txt`, text);
  res.status(200).json({ token: randomFileId });
});

// Route for getting file by it's token and name
app.get("/download/:key", (req, res) => {
  try {
    const text = readFileSync("./files/" + req.params.key + ".txt");
    res
      .status(200)
      .json({ filename: req.params.key.split(".")[1], text: text.toString() });
  } catch (e) {
    res.status(404).json({ error: "File was not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
