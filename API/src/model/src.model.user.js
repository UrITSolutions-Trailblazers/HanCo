const mongoose = require('mongoose');
const { addressScema } = require('./src.model.address');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    addresses: {
        type: [addressScema],
        required: false
    }
});

userSchema.statics.encryptPassword = async function(password){
     return await bcrypt.hash(password,10);
}

var User = mongoose.model('user', userSchema);

module.exports.User = User;