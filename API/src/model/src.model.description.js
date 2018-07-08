const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
    material: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    otherDetails: {
        type: String,
        required: false
    }
});

module.exports.descriptionSchema = descriptionSchema;
module.exports.Description = mongoose.model('description',descriptionSchema);