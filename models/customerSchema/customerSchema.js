const express = require('express');
const mongoose = require('mongoose'); // No need for 'default' in the require statement
const router = express.Router();

const customerSchema = new mongoose.Schema({
  identityEmail:{
    type:String
  },
  name: {
    type: String, 
    required: true, 
    trim: true 
  },
  email: {
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
    required: true,
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
