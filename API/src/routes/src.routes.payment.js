const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { User } = require('../model/src.model.user');
const { Product } = require('../model/src.model.product');
const { CartItem } = require('../model/src.model.cardItem');
const { Cart } = require('../model/src.model.cart');
const { Order } = require('../model/src.model.orders');


router.post('/done', async (req, res) => {

    const user = req.user;
    const transactionId = req.body.transactionId;

    if (!transactionId) return res.status(404).send('Invalid Request');

    console.log(user, transactionId);

    var cart = await Cart.findOne({ user: user._id }).populate({
        path: 'cartItems',
        populate: {
            path: 'cartItems',
        }
    });

    console.info('CART BEFORE PROCESS => ', cart);

    for (var item of cart.cartItems) {
        await Order.create({ user: user._id, supplier: item.supplier, cartItem: item, txId: transactionId, address: req.body.address });
        item.product.quantity = item.product.quantity - item.quantity;
        await Product.findByIdAndUpdate(item.product._id, item.product);
        await CartItem.deleteOne({ _id: item._id });
    }

    cart.grandTotal = 0;
    cart.cartItems = [];

    let result = await Cart.findByIdAndUpdate(cart._id, cart, { new: true });

    console.info('NEW CART => ', result);

    res.send('DONE');
});

module.exports = router;