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

  try {
    await product.save();
    res.render("category/allCategory")
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//data find by category
router.get("/byCategory", async (req, res) => {
  const category = req.query.category;
  console.log(category);

  if (!category) {
    return res.status(400).json({ error: "Category query parameter is required." });
  }

  try {
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category." });
    }

    res.render("categoryTable/categoryTable", {products})

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

//get all data
router.get("/api/byGetProduct", async(req, res)=>{
  try {
    const items = await  Product.find();
    console.log(items);
    res.send(items)
    
  } catch (error) {
    res.send(401).status({message: "Internal fetching issue"})
  }

})

module.exports = router;
