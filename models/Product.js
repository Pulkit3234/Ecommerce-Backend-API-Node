const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    image: { type: String },
    description: { type: String },
    brand: String,
    price: Number,
    countInStock: Number,
    rating: Number,
    numReviews: Number
   


});




module.exports = mongoose.model('Product', ProductSchema);

