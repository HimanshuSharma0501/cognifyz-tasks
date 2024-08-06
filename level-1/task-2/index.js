const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/submit-form", (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  if (!username || !email || !password || password !== confirm_password) {
    return res.status(400).send("Validation failed. Please check your inputs.");
  }

  req.session.formData = { username, email };

  res.send(
    'Form submitted successfully! <br><a href="/view-data">View Stored Data</a>'
  );
});

app.get("/view-data", (req, res) => {
  if (req.session.formData) {
    res.sendFile(path.join(__dirname, "views", "view-data.html"));
  } else {
    res.send('No data stored in session. <br><a href="/">Go back to form</a>');
  }
});

app.get("/get-stored-data", (req, res) => {
  if (req.session.formData) {
    res.json(req.session.formData);
  } else {
    res.json(null);
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
