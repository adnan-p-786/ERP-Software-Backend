const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    expenseTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expenseType",
        required: true
    }

});

module.exports = mongoose.model('expenses', expensesSchema)

