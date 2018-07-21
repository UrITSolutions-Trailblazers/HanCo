const mongoose = require('mongoose');
const { cartItemSchema } = require('./src.model.cardItem')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    cartItems: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cartItem' }],
        default: undefined
    },
    grandTotal: {
        type: Number,
        required: false
    }
});

module.exports.Cart = mongoose.model('cart', cartSchema);