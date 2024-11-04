const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  billingDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    address: { type: String, required: true },
    apartment: { type: String, default: "" },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  paymentMethod: { type: String, enum: ["Cash on delivery"], required: true },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 100 },
  userEmail: { type: String },
  total: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
module.exports = mongoose.model("Order", OrderSchema);
