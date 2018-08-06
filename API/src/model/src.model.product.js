const mongoose = require('mongoose');
const { descriptionSchema } = require('./src.model.description');
const { categorySchema } = require('./src.model.category');
const { supplierSchema } = require('./src.model.supplier')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: descriptionSchema,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    // displayDescription: {
    //     type: String,
    //     required: true
    // },
    images: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    totalRating: {
        type: Number,
        required: false,
        default: 0
    },
    count:  {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports.productSchema = productSchema;

module.exports.Product = mongoose.model('product',productSchema)