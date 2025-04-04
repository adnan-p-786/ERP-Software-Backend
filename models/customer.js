const mongoose = require('mongoose')

const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('customers', customersSchema)

