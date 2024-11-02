const express = require('express');
const mongoose = require('mongoose'); // No need for 'default' in the require statement
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    trim: true 
  },
  userEmail: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, 
  },
  password:{
    type:String,
    required:true,
    unique:true,
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
