const mongoose = require('mongoose')

const racksSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  });

  module.exports = mongoose.model('racks', racksSchema)

