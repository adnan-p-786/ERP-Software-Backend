const mongoose = require('mongoose')

const customersAccountSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    debit: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true
    }
});

module.exports = mongoose.model('customersAccount', customersAccountSchema)

