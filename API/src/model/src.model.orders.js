const mongoose = require('mongoose');
const { cartItemSchema } = require('./src.model.cardItem')
const { addressScema } = require('./src.model.address');

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'supplier'
    },
    cartItem: {
        type: cartItemSchema,
        required: true
    },
    txId: {
        type: String,
        required: true
    },
    address: {
        type: addressScema,
        required: true
    },
    courierName: {
        type: String
    },
    trackingId: {
        type: String
    }
});

module.exports.orderSchema = orderSchema;
module.exports.Order = mongoose.model('Order', orderSchema);