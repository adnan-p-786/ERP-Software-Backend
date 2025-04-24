const mongoose = require('mongoose')

const purchaseOtherExpSchema = new mongoose.Schema({
    otherExpenseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "otherexpenses",
        required: true
    },
    purchaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "purchase",
        required: true
    },
    amount:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('purchaseOtherExp', purchaseOtherExpSchema)

