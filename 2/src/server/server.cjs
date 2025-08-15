const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Todos array
let todos = [
  {
    id: 1,
    title: "Salam!",
    name: "Salam!",
    lifetime: null,
    userId: 1,
    completed: false,
  },
  {
    id: 2,
    title: "Isheleyir?",
    name: "Isheleyir?",
    lifetime: null,
    userId: 1,
    completed: false,
  },
];
let nextId = 1;

// GET /todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos
app.post("/todos", (req, res) => {
  const { title, name, userId, completed } = req.body;

  // Validation
  if (!title || !name || !userId || completed === undefined) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const newTodo = {
    id: nextId++,
    title,
    name,
    lifetime: null,
    userId,
    completed,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  const { title, name, userId, completed } = req.body;
  if (!title || !name || !userId || completed === undefined) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  todos[index] = {
    ...todos[index],
    title,
    name,
    userId,
    completed,
    lifetime: null,
  };

  res.json(todos[index]);
});

// DELETE /todos/:id
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  todos = todos.filter((t) => t.id !== id);
  res.status(204).send();
});

// Server start
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
