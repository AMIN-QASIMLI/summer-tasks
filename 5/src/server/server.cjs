const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Static folder
app.use("/uploads", express.static("uploads"));

// Product array
let products = [
  {
    id: 1,
    title: "Filankesov Filankes",
    price: 1300,
    description: "The best enginer in the world!",
    image: "http://localhost:3001/uploads/1755286990636-489792391.jpg",
    isDeletable: "false",
  },
  {
    id: 2,
    title: "Beard trimming set",
    price: 30,
    description: "The best set in the world!",
    image: "http://localhost:3001/uploads/1755287014629-108896857.jpg",
    isDeletable: "false",
  },
  {
    id: 3,
    title: "Rogmax Robin 4 White And Black 7Fan ARGB + Controll",
    price: 600,
    description: "The best case in the world!",
    image: "http://localhost:3001/uploads/1755287054074-156278289.jpg",
    isDeletable: "false",
  },
  {
    id: 4,
    title: "ZotagGaming RTX 5090",
    price: 5000,
    description: "The best graphiccard in the world!",
    image: "http://localhost:3001/uploads/1755287082527-668644023.jpg",
    isDeletable: "false",
  },
];
let nextProductId = 5;

// GET /products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /products
app.post("/products", upload.single("image"), (req, res) => {
  const { title, price, description, isDeletable } = req.body;

  if (!title || !price) return res.status(400).json({ error: "Invalid data" });

  const imageUrl = req.file
    ? `http://localhost:3001/uploads/${req.file.filename}`
    : "";

  const newProduct = {
    id: nextProductId++,
    title,
    price: Number(price),
    description: description || "",
    image: imageUrl,
    isDeletable: isDeletable ?? true,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id
app.put("/products/:id", upload.single("image"), (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const { title, price, description, isDeletable } = req.body;
  if (!title || !price) return res.status(400).json({ error: "Invalid data" });

  const imageUrl = req.file
    ? `http://localhost:3001/uploads/${req.file.filename}`
    : products[index].image;

  products[index] = {
    ...products[index],
    title,
    price: Number(price),
    description: description || "",
    image: imageUrl,
    isDeletable: isDeletable ?? products[index].isDeletable,
  };

  res.json(products[index]);
});

// DELETE /products/:id
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

// -------------------- inCarts --------------------
let inCarts = [];
let nextCartId = 1;

// GET /inCarts
app.get("/inCarts", (req, res) => {
  res.json(inCarts);
});

// POST /inCarts
app.post("/inCarts", (req, res) => {
  const { title, price, description, image } = req.body;
  if (!title || !price)
    return res.status(400).json({ error: "Title and Price is required" });

  const newItem = { id: nextCartId++, title, price, description, image };
  inCarts.push(newItem);
  res.status(201).json(newItem);
});

// DELETE /inCarts/:id
app.delete("/inCarts/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = inCarts.length;
  inCarts = inCarts.filter((item) => item.id !== id);

  if (inCarts.length === initialLength)
    return res.status(404).json({ error: "Item not found" });
  res.sendStatus(204);
});

// Server start
app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
