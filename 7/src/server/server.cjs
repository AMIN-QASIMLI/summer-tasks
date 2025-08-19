// server.cjs
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = "my_super_secret_key";

let users = [];
let last_id = 1;

app.get("/", (req, res) => {
  res.send("Running!");
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token can not find" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token is invalid" });
    req.user = user;
    next();
  });
};

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/profile", authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  res.json({ message: "Welcome!", user });
});

app.post("/users", async (req, res) => {
  const { first_name, password, last_name, companyName, mobile, email } =
    req.body;
  if (!first_name || !password)
    return res.status(400).json({ error: "Name and Password is required" });

  const exists = users.find((u) => u.password === password);
  if (exists) {
    return res.status(400).json({ error: "Password already exists" });
  }

  const email_exists = users.find((u) => u.email === email);

  if (email_exists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newItem = {
    id: last_id++,
    first_name,
    last_name,
    companyName,
    mobile,
    email,
    password: hashedPassword,
  };
  users.push(newItem);
  res.status(201).json(newItem);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = users.length;
  users = users.filter((item) => item.id !== id);

  if (users.length === initialLength)
    return res.status(404).json({ error: "Item not found" });
  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ error: "User can not find" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Password is false" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login is succesfull", token });
});

// --- Server --- //
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
