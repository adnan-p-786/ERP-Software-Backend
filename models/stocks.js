const mongoose = require('mongoose')

const stocksSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
        required: true
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "units",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    purchase_price: {
        type: Number,
        required:true
    },
    selling_price: {
        type: Number,
        required:true
    },
    barcode: {
        type: Number,
        required:true
    },
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
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors",
        required: true
    },
    billNo: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('stocks', stocksSchema)

