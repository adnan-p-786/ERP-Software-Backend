const mongoose = require('mongoose')

const accountsSchema = new mongoose.Schema({
    credit: {
        type: Number,
        required: true,
    },
    debit: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    particulars: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('accounts', accountsSchema)

