const mongoose = require('mongoose')

const sales_itemsSchema = new mongoose.Schema({
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stocks",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "units",
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('sales_items', sales_itemsSchema)

