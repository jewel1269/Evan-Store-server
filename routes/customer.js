const express = require("express");
const router = express.Router();
const Customer = require("../models/customerSchema/customerSchema.js");

//user create
router.post("/create", async (req, res) => {
  try {
    const { name, userEmail, password } = req.body;
    if (!name || !userEmail || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Create a new customer instance
    const customer = new Customer({
      name,
      userEmail,
      password,
    });
    await customer.save();
    res.status(200).send({ message: "Customer creation seccessfull." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Customer creation failed." });
  }
});

//find user with userEmail
router.get("/user", async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const user = await Customer.findOne({ userEmail });
    console.log(user);

    // If user not found
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

  
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.userEmail,
      phone: user.phone, 
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  const { userEmail, password } = req.body;
  console.log(userEmail, password);

  if (!userEmail || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const user = await Customer.findOne({ userEmail });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.render("customer/customer", { customers });
  } catch (err) {
    console.error("Error retrieving customer data:", err);
    res.status(500).send({ message: "Error retrieving customer data" });
  }
});

router.delete("/deleteCustomer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }
    res.send(customer);
  } catch (err) {
    console.error("Error deleting customer:", err);
    res.status(500).send({ message: "Error deleting customer" });
  }
});

module.exports = router;
