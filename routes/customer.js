const express = require('express');
const router = express.Router()
const Customer = require("../models/customerSchema/customerSchema.js")



//user create
router.post("/create", async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      console.log(name, email, password, phone, address);
      // Check if all required fields are present
      if (!name || !email || !password || !phone || !address) {
        return res.status(400).send({ message: "All fields are required." });
      }
  
      // Create a new customer instance
      const customer = new Customer({
        name,
        email,
        password,
        phone,
        address,
        identityEmail: "jewelmia@gmail.com",
      });
      await customer.save();
      res.status(200).send({ message: "Customer creation seccessfull." });

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Customer creation failed." });
    }
  });
  

router.get('/', async (req, res) => {
    try {
        const email = "jewelmia@gmail.com";
        const customers = await Customer.find({identityEmail: email });
        res.render('customer/customer', { customers });
    } catch (err) {
        console.error("Error retrieving customer data:", err);
        res.status(500).send({ message: "Error retrieving customer data" });
    }
});


router.delete('/deleteCustomer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.send(customer)
    } catch (err) {
        console.error("Error deleting customer:", err);
        res.status(500).send({ message: "Error deleting customer" });
    }
});




module.exports = router;