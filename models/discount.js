const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('discount', discountSchema)

