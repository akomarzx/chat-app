const mongoose = require('mongoose');
const messages = require('../models/message');

let persistMessage = async (message) => {
    let messageJson = JSON.parse(message.content.toString());
    let newMessage = {
        recepient: messageJson.recepient,
        sender: messageJson.sender,
        message: messageJson.message
    };

    let messageTemp = new messages(newMessage);

    console.log(messageTemp);

    try {
        await messageTemp.save();
    } catch (error) {
        console.log(error.stack)
    }
}

let getAllMessagesForConv = async (req, res, next) => {
    let firstUser = req.query.firstUser;
    let secondUser = req.query.secondUser;

    console.log(firstUser, secondUser);

    res.send('hello');
}

module.exports = {
    persistMessage,
    getAllMessagesForConv
}