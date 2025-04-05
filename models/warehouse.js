const mongoose = require('mongoose')

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores",
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: true
    }
});

module.exports = mongoose.model('warehouse', warehouseSchema)

