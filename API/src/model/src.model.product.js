const mongoose = require('mongoose');
const { descriptionSchema } = require('./src.model.description');
const { categorySchema } = require('./src.model.category');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    description: {
        type: descriptionSchema,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    displayDescription: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports.productSchema = productSchema;

module.exports.Product = mongoose.model('product',productSchema)