const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { User } = require('../model/src.model.user');
const { Product } = require('../model/src.model.product');
const { Category } = require('../model/src.model.category');
const { CartItem } = require('../model/src.model.cardItem');
const { Cart } = require('../model/src.model.cart');
router.post('/', async (req, res) => {

    const user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'phone']));

    user.password = await User.encryptPassword(user.password);

    await user.validate(async (err) => {
        if (err) return res.send(err.errors);

        try {
            let result = await User.create(user);
            return res.send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    })

});

router.post('/login', async (req, res) => {

    const credentials = _.pick(req.body, ['email', 'password']);
    console.log(credentials);
    var user = {};
    try {
        user = await User.findOne({ email: credentials.email });
        console.log(user)
        let result = await bcrypt.compare(credentials.password, user.password);
        if (!result) {
            return res.status(400).send(new Error('Incorrect password'));
        }
    } catch (error) {
        return res.status(400).send(error);
    }
    let token = await jwt.sign(_.pick(user, ['email', '_id']), 'pinki');
    res.send({ token: token, user: _.pick(user, ['firstName', 'email', 'phone', '_id', 'role']) });
});

router.post('/count', async (req, res) => {

    const filter = req.body;
    if (filter.name) {
        filter.name = { $regex: `^.*${filter.name}.*`, $options: "i" }
    }else{
        // console.log('No name filter')
        delete filter.name;
    }

    if(filter.price) {
        filter.price = {$lt : filter.price}
    }else{
        delete filter.price;
    }
    console.log(filter);
    const count = await Product.count(filter)
    const result = JSON.stringify(count);
    res.send(result);
});

router.post('/products', async (req, res) => {
    const filter = req.body.filter;
    const page = req.body.page;
    if (filter.name) {
        filter.name = { $regex: `^.*${filter.name}.*`, $options: "i" }
    }else{
        // console.log('No name filter')
        delete filter.name;
    }

    if(filter.price) {
        filter.price = {$lt : filter.price}
    }else{
        delete filter.price;
    }
    console.log(filter);
    let data  = {};
    data.products = await Product.find(filter).skip(3 * (page - 1)).limit(24);
    data.count = await Product.count(filter);
    console.log(data);
    res.send(data);
});

router.get('/category', async (req, res) => {

    res.send(await Category.find({}));
});

router.post('/product', async (req, res) => {
    // console.log('POST /product route called')
    const productId = req.body.id;
    // console.log(productId);    
    res.send(await Product.findById(productId));
});


router.get('/test', async (req, res) => {
    console.log(req.headers);

    res.send("success");
});

module.exports = router;