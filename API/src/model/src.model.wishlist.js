const mongoose = require('mongoose');
const { productSchema } = require('./src.model.product')

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: {
        type: [productSchema]
    }
});

module.exports.Wishlist = mongoose.model('wishlist', wishlistSchema);