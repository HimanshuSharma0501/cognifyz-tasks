const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

app.get("/api/users", (req, res) => {
  res.status(201).json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find(
    (userToFind) => userToFind.id === parseInt(req.params.id)
  );
  if (!user) return res.status(404).send("User not found");
  res.status(201).json(user);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find(
    (userToFind) => userToFind.id === parseInt(req.params.id)
  );
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.send("User deleted");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
