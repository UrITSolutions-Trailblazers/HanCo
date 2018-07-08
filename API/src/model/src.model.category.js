const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports.categorySchema = categorySchema;
module.exports.Category = mongoose.model('category',categorySchema)