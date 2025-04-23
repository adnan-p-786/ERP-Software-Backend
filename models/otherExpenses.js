const mongoose = require('mongoose')

const otherexpensesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    amount: {
        type: Number,
        required: true,
      }
  });

  module.exports = mongoose.model('otherexpenses', otherexpensesSchema)

