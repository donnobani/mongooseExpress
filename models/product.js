const mongoose = require('mongoose');

// defining schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('Product', productSchema);

// exporting from file
module.exports = Product;