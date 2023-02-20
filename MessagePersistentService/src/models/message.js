const mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    recepient: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Messages', messageSchema);