const mongoose = require('mongoose')

const vendorsSchema = new mongoose.Schema({
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
    },
    vatNo: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('vendors', vendorsSchema)

