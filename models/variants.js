const mongoose = require('mongoose')

const variantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Nvariants,
        required: true,
    },
    value: {
        type: Nvariants,
        required: true,
    }
});

module.exports = mongoose.model('variants', variantsSchema)

