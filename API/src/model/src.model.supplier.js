const mongoose = require('mongoose');
const { userSchema } = require('./src.model.user');

const supplierSchema = new mongoose.Schema({
    user: {
        type: userSchema,
        required: false
    },
    companyName: {
        type: String,
        required: true
    },
    lisenceNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
});