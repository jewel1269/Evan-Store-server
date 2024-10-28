const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    new: {
      type: Number,
      required: true,
      min: 0 
    },
    old: {
      type: Number,
      min: 0 
    }
  },
  discount: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  review: {
    type: Number,
    default: 0 
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  image: [
    {
      type: String,
      required: true 
    }
  ],
  description: {
    type: String,
    maxlength: 500
  },
  colors: [
    {
      type: String
    }
  ],
  sizes: [
    {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    }
  ],
  instock: {
    type: Boolean,
    default: true
  },
  delivery: {
    freedelivery: {
      type: Boolean,
      default: false
    },
    returnpolicy: {
      type: String,
      default: "No return policy"
    }
  },
  storeName: {
    type: String,
    default: "Evan Store"
  },
  bestSale: {
    type: Boolean,
    default: false
  },
  NewArrival: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
