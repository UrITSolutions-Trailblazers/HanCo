const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { User } = require('../model/src.model.user');
const { Product } = require('../model/src.model.product');

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

router.get('/products', async (req, res) => {
    res.send(await Product.find({}));
});

router.get('/test', async (req, res) => {
    console.log(req.headers);

    res.send("success");
});

module.exports = router;