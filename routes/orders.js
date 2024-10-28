const express = require('express');
const router = express.Router()


const products = [
    {
        name: 'T-Shirt For Female',
        CustomerName: 'Jewel Mia',
        Address: "Dhaka Bangaldesh",
        price: 799.00,
        Number: "0157545856",
        status: 'Pending',
        updateDate: '2017-08-26 13:55:07'
    },
    {
        name: 'Colorfull Female Watch',
        CustomerName: 'Shamima Aktere',
        Address: "Kishoreganj Sadar",
        price: 250.00,
        Number: '016584215',
        status: 'Pending',
        updateDate: '2017-08-26 13:28:20'
        
    },
    // Add more product objects as needed
];



router.get('/', (req, res) => {

    res.render('orders/orders',{products});
});



module.exports = router;