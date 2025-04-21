const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    privileges: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'privileges'
    }
});

module.exports = mongoose.model('roles', rolesSchema);
