const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {

    res.render('category/allCategory');
});


router.get('/categorytable', (req, res) => {
    const products = [
      {
        name: "Micellar Hyaluronic Aloe Water",
        brand: "Garnier Skin Active",
        price: 40,
        stock: 386,
        sold: 1450,
        volume: 400,
        type: "Sunscreen",
        rating: 4.6,
        reviews: 41,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrrkQmoyeenO24q5rCOGxyxkQVMqbQ5xLY4A&s"  
      },
      {
        name: "Skinceuticals Blemish + Age Defense",
        brand: "Garnier Skin Active",
        price: 39.99,
        stock: 386,
        sold: 1450,
        volume: 250,
        type: "Moisturizer",
        rating: 4.9,
        reviews: 100,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6RuNzGnkALrBwFgKxrWktKpE7WJ5r1gKYg&s" 
      },
      {
        name: "Cleanse & Polish Hot Cloth Cleanser",
        brand: "Garnier Skin Active",
        price: 36.88,
        stock: 386,
        sold: 1450,
        volume: 100,
        type: "Sunscreen",
        rating: 4.9,
        reviews: 34,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneeyZ3UpujgoNIKaud51sEBBGdPA6G3LlgA&s"  
      },
      {
        name: "Ceramidin Cream",
        brand: "Garnier Skin Active",
        price: 35,
        stock: 386,
        sold: 1450,
        volume: 175,
        type: "Moisturizer",
        rating: 4.6,
        reviews: 50,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3OzMCyNjRvkVNePDLTD6HQsu0aGONiMjNA&s"  
      },
      {
        name: "Skin Perfecting 2% BHA Liquid Exfoliant",
        brand: "Paula's Choice",
        price: 32.56,
        stock: 386,
        sold: 1450,
        volume: 225,
        type: "Cleanser",
        rating: 4.6,
        reviews: 41,
        image: "https://skincarebd.com/wp-content/uploads/2021/06/skin-perfecting-2-percent-bha-liquid-2016-M.png"  
      },
      // Add more products as necessary...
    ];
  
    // Render the EJS file and pass the product data
    res.render('categoryTable/categoryTable', { products });
  });
  


module.exports = router;