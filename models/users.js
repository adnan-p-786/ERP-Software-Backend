const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  email: {
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
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  jobtitle: {
    type: String,
    required: true
  },
  empcode: {
    type: Number,
    required: true
  },
  joiningDate: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required: true
  },
  rolesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true
  },
  racksId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "racks",
    required: true
  }
});

module.exports = mongoose.model('users', usersSchema)

