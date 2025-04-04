const mongoose = require('mongoose')

const vendorsAccountSchema = new mongoose.Schema({
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
    vendorsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors",
        required: true
    }
});

module.exports = mongoose.model('vendorsAccount', vendorsAccountSchema)

