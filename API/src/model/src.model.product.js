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
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});