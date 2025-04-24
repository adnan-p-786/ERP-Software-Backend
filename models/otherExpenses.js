const mongoose = require('mongoose')

const otherexpensesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  });

  module.exports = mongoose.model('otherexpenses', otherexpensesSchema)

