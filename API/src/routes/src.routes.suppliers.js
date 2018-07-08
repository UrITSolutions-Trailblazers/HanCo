const express = require('express');
const router = express.Router();
const _ = require('lodash');
const multer = require('multer');
const upload = multer({ dest: './uploads/images' });

const { Category } = require('../model/src.model.category');
const { Product } = require('../model/src.model.product')

router.post('/category', async (req, res) => {

    const category = new Category(_.pick(req.body, ['name']));

    Category.create(category, async (err, val) => {
        if (err) return res.status(500).send(err);

        res.send(await Category.find({}));
    });
});

router.get('/category', async (req, res) => {
    
    res.send(await Category.find({}));
});

router.get('/products', async (req, res) => {
    res.send(await Product.find({}));
});

router.post('/product/image/upload', upload.single('image'), function (req, res) {
    
    const product = new Product(_.pick(req.body, ['name', 'price', 'quantity', 'category', 'images', 'description']));
    product.images[0] = req.file.filename;

    Product.create(product, (err, val) => {
        if (err) return res.status(500).send('Server error');

        res.send(val);
    })
});

module.exports = router;