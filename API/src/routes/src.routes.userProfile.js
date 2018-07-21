const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { User } = require('../model/src.model.user');
const { Product } = require('../model/src.model.product');
const { CartItem } = require('../model/src.model.cardItem');
const { Cart } = require('../model/src.model.cart');
const { Order } = require('../model/src.model.orders')


router.post('/addToCart', async (req, res) => {

    // console.log(req.data);
    const data = _.pick(req.body, ['id', 'supplier']);
    const user = req.user;
    // console.log(data)
    // console.log(user)

    const product = await Product.findById(data.id);
    var cart = await Cart.findOne({ user: user._id }).populate({
        path: 'cartItems',
        populate: {
            path: 'cartItems',
        }
    });

    console.log('Cart --->')
    console.log(cart)

    if (!cart) {
        console.log('Cart not present.')
        var cartItem = new CartItem({
            product: product,
            supplier: data.supplier,
            subTotal: product.price
        })

        cartItem = await CartItem.create(cartItem);
        cartItems = [];
        cartItems.push(cartItem._id);
        cart = new Cart({
            user: user._id,
            cartItems: cartItems,
            grandTotal: product.price
        });
        console.log(cart);
        console.log(await Cart.create(cart));
        return res.send('Success');
    }

    var found = false;
    if (cart.user) {
        let index = 0;
        console.log('Searching');
        cart.cartItems.forEach(async item => {
            // console.log(item);
            if (item.product._id == data.id && !item.isOrdered) {
                console.log('Found in cart')
                found = true;
                // console.log(item)
                cart.cartItems[index].quantity = cart.cartItems[index].quantity + 1;
                cart.cartItems[index].subTotal = cart.cartItems[index].subTotal + product.price;
                cart.grandTotal = cart.grandTotal + product.price;
                await CartItem.updateOne({ _id: cart.cartItems[index]._id }, cart.cartItems[index]);
            }
            index++;
        });
    }

    if (!found) {
        console.log('Not Found')
        var cartItem = new CartItem({
            product: product,
            supplier: data.supplier,
            subTotal: product.price
        })
        cartItem = await CartItem.create(cartItem);
        cart.cartItems.push(cartItem._id);
        cart.grandTotal = cart.grandTotal + product.price;
    }

    console.log('===============>>> Process complete.')
    console.log(cart);

    await Cart.findByIdAndUpdate(cart._id, cart);
    res.send('Success');
});

router.get('/cart', async (req, res) => {
    const user = req.user;

    const cart = await Cart.findOne({ user: user._id }).populate({
        path: 'cartItems',
        populate: {
            path: 'cartItems',
        }
    });
    res.send(cart);
})

router.get('/address', async (req, res) => {
    var user = req.user;
    user = await User.findById(user._id);

    res.send(user.addresses);
})

router.post('/address', async (req, res) => {
    var user = req.user;
    user = await User.findById(user._id);
    const address = _.pick(req.body, ['name', 'doorNumber', 'street', 'city', 'state', 'landmark', 'postalCode']);
    user.addresses.push(address);

    await User.findByIdAndUpdate(user._id, user);

    res.send(user);
})

router.get('/orders', async (req, res) => {

    const user = req.user;

    try {
        const orders = await Order.find({ user: user._id }).populate({
            path: 'user'
        });
        // console.info('ORDERS => ', orders);
        res.send(orders);
    } catch (error) {
        // console.log('[ORDERS] Error => ', error);
        res.status(500).send(error);
    }

});


module.exports = router;