const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "warehouse",
    required: true
  }
});

module.exports = mongoose.model('location', locationSchema)

