const mongoose = require('mongoose');
const { productSchema } = require('./src.model.product')

const cartItemSchema = new mongoose.Schema({
    product: {
        type: productSchema,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'supplier'
    },
    isOrdered: {
        type: Boolean,
        required: true,
        default: false
    },
    isPacked: {
        type: Boolean,
        required: true,
        default: false
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    },
    isShipped: {
        type: Boolean,
        required: true,
        default: false
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    subTotal: {
        type: Number,
        required: true
    }
});

module.exports.cartItemSchema = cartItemSchema;
module.exports.CartItem = mongoose.model('cartItem', cartItemSchema);