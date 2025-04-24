const mongoose = require('mongoose')

const purchase_ItemsSchema = new mongoose.Schema({
    purchaseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "purchase",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    unitsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "units",
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    variantsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variants",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('purchase_Items', purchase_ItemsSchema)

