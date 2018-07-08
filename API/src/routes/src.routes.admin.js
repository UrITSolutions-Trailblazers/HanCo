const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../model/src.model.user');
const { Supplier } = require('../model/src.model.supplier');

router.post('/supplier', async (req, res) => {
    console.log(req.body);
    
    var user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'phone']));
    user.role = 'SUPPLIER'
    console.log(user);
    user.password = await User.encryptPassword(user.password);
    let savedUser = await User.create(user);

    var supplier = new Supplier(_.pick(req.body, ['companyName', 'lisenceNumber']));

    supplier.user = savedUser._id;

    let savedSupplier = await Supplier.create(supplier);

    res.send(savedSupplier);
});

router.get('/supplier/all', async (req, res) => {
    
    Supplier.find({}).populate('user').exec((err, suppliers)=>{
        if(err) return res.status(500).send(err);

        res.send(suppliers);
    })
});

module.exports = router;