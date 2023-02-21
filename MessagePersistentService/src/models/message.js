const mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    parties: [{
        type: String
    }],
    messages: [{
        sender: {
            type: String
        },
        message: {
            type: String
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Messages', messageSchema);