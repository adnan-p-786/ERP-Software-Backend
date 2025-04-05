const mongoose = require('mongoose')

const storesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    username:{
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
        type: Number,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      active: {
        type: String,
        required: true
      }
  });

  module.exports = mongoose.model('stores', storesSchema)

