const mongoose = require('mongoose')

const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    privilegesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "privileges",
        required: true
    }
});

module.exports = mongoose.model('roles', rolesSchema)

