const mongoose = require('mongoose');
const Product = require('./models/Product');

main().catch(err => console.log(err));

// defines async function
async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log("mongo connected");
}

const seedProducts = [
  {
    name: 'eggplant',
    price: 4.99,
    category: 'vegetable'
  },
  {
    name: 'apple',
    price: 5.99,
    category: 'fruit'
  },
  {
    name: 'zucchini',
    price: 8.99,
    category: 'vegetable'
  },
  {
    name: 'zucchiplant',
    price: 9.99,
    category: 'vegetable'
  },
  {
    name: 'broccoli',
    price: 1.25,
    category: 'vegetable'
  },
  {
    name: 'mango',
    price: 5,
    category: 'fruit'
  }
]

// if any item does not meet validation, none will be inserted
Product.insertMany(seedProducts).then( res =>{
  console.log(res);
}).catch(e=>{
  console.log(e);
})

