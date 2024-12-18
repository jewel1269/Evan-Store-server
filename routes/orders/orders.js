// routes/order.js
const express = require("express");
const router = express.Router();
const Order = require("../../models/OrderSchema/OrderSchema.js");

// Create a new order
router.post("/api/orders", async (req, res) => {
  try {
    const {
      billingDetails: {
        firstName,
        lastName,
        address,
        apartment,
        city,
        phone,
        email,
      },
      items,
      subtotal,
      shipping,
      userEmail,
      total,
      paymentMethod,
    } = req.body;

    const order = new Order({
      billingDetails: {
        firstName,
        lastName,
        address,
        apartment,
        city,
        phone,
        email,
      },
      items,
      subtotal,
      shipping,
      userEmail,
      total,
      paymentMethod,
      status: "Pending",
    });

    await order.save();
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

//get all order
router.get("/allOrders", async (req, res) => {
  try {
    const products = await Order.find();
    res.render("orders/orders", { products });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/singleOrder", async (req, res) => {
  try {
    const { email } = req.query;


    const order = await Order.findOne({ userEmail: email });
    console.log("Requested email:", order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
