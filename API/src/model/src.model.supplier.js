const mongoose = require('mongoose');
const { userSchema } = require('./src.model.user');

const supplierSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    companyName: {
        type: String,
        required: true
    },
    lisenceNumber: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports.supplierSchema = supplierSchema;
module.exports.Supplier = mongoose.model('supplier', supplierSchema);