const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    billNo: {
        type: Number,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors",
        required: true
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
    totalAmount: {
        type: Number,
        required: true
    },
    otherExpense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "otherexpenses",
        required: true
    },

});

module.exports = mongoose.model('purchase', purchaseSchema)

