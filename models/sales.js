const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores",
        required: true
    },
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "warehouse",
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "discount",
        required: true
    },
    discounted_amount: {
        type: Number,
        required: true
    },
    usersId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

module.exports = mongoose.model('sales', salesSchema)

