require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.get("/", (req, res) => {
  res.send("Hello Node");
});

// fetch all products using .find({})
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch a single product using .findById(id) params
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Creates a new Products
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Updates a products
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB Database
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log("node running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
