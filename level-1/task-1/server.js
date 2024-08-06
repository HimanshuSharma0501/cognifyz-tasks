const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { name, email } = req.body;
  res.render("response", { name, email });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
