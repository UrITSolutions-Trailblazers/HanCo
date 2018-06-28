const express = require('express');
const router = express.Router();
const _ = require('lodash');

const jwt = require('jsonwebtoken');

const { User } = require('../model/src.model.user');

router.post('/', async (req, res) => {

    const user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'phone']));

    user.password = await User.encryptPassword(user.password);

    await user.validate(async (err) => {
        if (err) return res.send(err.errors);

        try {
            let result = await User.create(user);
            return res.send(result);
        } catch (error) {
            return res.status(500).send('Somthing went wrong.');
        }
    })

});

router.post('/login', async (req, res) => {

    const credentials = _.pick(req.body, ['email', 'password']);
    console.log(credentials);
    var user = {};
    try {
        user = await User.findOne({credentials});
        console.log('User found');
        console.log(user);
    } catch (error) {
        return res.status(400).send(error);
    }
    let token = await jwt.sign(user.firstName,'pinki');
    res.header('x-auth-token',token).send(user);
});

module.exports = router;