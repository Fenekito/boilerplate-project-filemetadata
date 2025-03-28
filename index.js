var express = require("express");
var cors = require("cors");
const multer = require("multer");
require("dotenv").config();

var app = express();

app.use(multer().any());
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  const file = req.files[0];
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
