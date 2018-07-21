const express = require('express');
const router = express.Router();
const _ = require('lodash');
const multer = require('multer');
const upload = multer({ dest: './uploads/images' });

const { Category } = require('../model/src.model.category');
const { Product } = require('../model/src.model.product');
const { Order } = require('../model/src.model.orders');

router.post('/category', async (req, res) => {

    const category = new Category(_.pick(req.body, ['name']));

    Category.create(category, async (err, val) => {
        if (err) return res.status(500).send(err);

        res.send(await Category.find({}));
    });
});

router.get('/orders', async (req, res) => {

    const user = req.user;

    try {
        const orders = await Order.find({ supplier: user._id }).populate({
            path: 'user'
        });
        // console.info('ORDERS => ', orders);
        orders.reverse();
        res.send(orders);
    } catch (error) {
        // console.log('[ORDERS] Error => ', error);
        res.status(500).send(error);
    }

});


router.get('/category', async (req, res) => {

    res.send(await Category.find({}));
});

router.get('/products', async (req, res) => {
    const user = req.user;

    res.send(await Product.find({supplier: user._id}));
});

router.post('/product/image/upload', upload.single('image'), function (req, res) {

    const product = new Product(_.pick(req.body, ['name', 'supplier', 'section', 'price', 'quantity', 'category', 'images', 'description']));
    product.images[0] = req.file.filename;

    console.log(product);

    Product.create(product, (err, val) => {
        if (err) return res.status(500).send(err);

        res.send(val);
    })
});

router.post('/pack', async (req, res) => {

    const user = req.user;
    const orderId = req.body.id;

    var order = await Order.findById(orderId);
    // console.info('User => ', user);
    // console.info('Order => ', order);

    if (order.supplier != user._id) return res.status(400).send('Not authorised');

    // console.info('==========  AUTHORIZED  ==========')
    order.cartItem.isPacked = true;
    await Order.findByIdAndUpdate(orderId, order, { new: true });
    // console.info('New Order => ',newOrder)
    res.send('DONE');

});

router.post('/dispatch', async (req, res) => {

    const user = req.user;
    const orderId = req.body.id;
    const courierName = req.body.courierName;
    const trackingId = req.body.trackingId;

    var order = await Order.findById(orderId);
    if (order.supplier != user._id) return res.status(400).send('Not authorised');

    order.cartItem.isShipped = true;
    order.courierName = courierName;
    order.trackingId = trackingId;
    await Order.findByIdAndUpdate(orderId, order);

    res.send('DONE');
});

router.post('/confirm', async (req, res) => {

    const user = req.user;
    const orderId = req.body.id;

    var order = await Order.findById(orderId);
    if (order.supplier != user._id) return res.status(400).send('Not authorised');

    order.cartItem.isApproved = true;
    await Order.findByIdAndUpdate(orderId, order);

    res.send('DONE');
});


module.exports = router;