const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const multer = require("multer"); 
const Port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 


// Static files
app.use(express.static("public"));
app.use('/uploads', express.static('./uploads'));


// EJS view engine setup
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/main");


// Import all routes
const Customer = require("./routes/customer.js");
const Analysis = require("./routes/analysis/analysis.js");
const Category = require("./routes/category/category.js");
const AddProducts = require("./routes/products/products.js");
const connectDB = require("./controller/connect.js");
const Orders = require("./routes/orders/orders.js")



// Connect to the database using mongoose
const uri = process.env.MONGO_URI;
connectDB(uri);



// Default route to show UI
app.get("/", (req, res) => {
  const pageTitle = "Evan Store";
  const pageDescription =
    "This is a sample EJS template rendered by Express. Explore the content!";
  res.render("index", { title: pageTitle, description: pageDescription });
});

// All routes
app.use("/customers", Customer);
app.use("/analysis", Analysis);
app.use("/category", Category);
app.use("/product", AddProducts);
app.use("/order", Orders);


// Sample route for health check or status
app.get("/status", (req, res) => {
  res.send("Server is running...");
});

// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port: http://localhost:${Port}`);
});
