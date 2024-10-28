const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../../models/productSchema/productSchema.js");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("image", 3); 

// Render the add product form
router.get("/", (req, res) => {
  res.render("addProducts/addProduct");
});

// API to add a product
router.post("/add", upload, async (req, res) => {
  // Manual validation
  const {
    category,
    productName,
    price,
    discount,
    rating,
    review,
    description,
    colors,
    sizes,
    instock,
    delivery,
    storeName,
    bestSale,
    NewArrival,
  } = req.body;

  // Ensure price fields are parsed as numbers
  const newPrice = parseFloat(price.new);
  const oldPrice = price.old ? parseFloat(price.old) : null;

  // Validate required fields
  if (!category || !productName || isNaN(newPrice)) {
    return res
      .status(400)
      .json({ message: "Category, Product Name, and New Price are required." });
  }

  // Validate image uploads
  const images = req.files ? req.files.map((file) => file.path) : [];
  if (images.length === 0) {
    return res.status(400).json({ message: "At least one image is required." });
  }

  // Log incoming data for debugging
  console.log({
    category,
    productName,
    price: { new: newPrice, old: oldPrice },
    discount,
    rating,
    review,
    description,
    colors,
    sizes,
    instock,
    delivery,
    storeName,
    bestSale,
    NewArrival,
    images,
  });

  // Create a new product instance
  const product = new Product({
    category,
    productName,
    price: {
      new: newPrice,
      old: oldPrice,
    },
    discount: discount || null,
    rating: rating ? Number(rating) : null,
    review: review ? Number(review) : null,
    image: images,
    description: description || "",
    colors: Array.isArray(colors) ? colors : [],
    sizes: Array.isArray(sizes) ? sizes : [],
    instock: instock === "on", 
    delivery: {
      freedelivery: delivery.freedelivery === "on", 
      returnpolicy: delivery.returnpolicy || "No return policy",
    },
    storeName: storeName || "Evan Store",
    bestSale: bestSale === "on", 
    NewArrival: NewArrival === "on", 
  });

  console.log(product);

  try {
    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
