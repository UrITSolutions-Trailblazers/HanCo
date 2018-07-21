const mongoose = require('mongoose');

const addressScema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    doorNumber: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: false
    },
    postalCode: {
        type: Number,
        required: true
    }

});

module.exports.addressScema = addressScema;
module.exports.Address = mongoose.model('address',addressScema);