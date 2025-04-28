const mongoose = require('mongoose')

const variantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('variants', variantsSchema)

