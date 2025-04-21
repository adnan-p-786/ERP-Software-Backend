const mongoose = require('mongoose')

const privilegesSchema = new mongoose.Schema({
    crud: {
        type: String,
        required: true,
    },
    create: {
        type: String,
        required: true,
    },
    update: {
        type: String,
        required: true,
    },
    delete: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('privileges', privilegesSchema)

