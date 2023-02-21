const mongoose = require('mongoose');
const messages = require('../models/message');

let persistMessage = async (message) => {
    let messageJson = JSON.parse(message.content.toString());
    let newMessage = {
        recepient: messageJson.recepient,
        sender: messageJson.sender,
        message: messageJson.message
    };

    let conversation = await messages.findOneAndUpdate({
        parties: {
            $all: [newMessage.sender, newMessage.recepient]
        }
    }, {
        $push: {
            messages: {
                sender: newMessage.sender,
                message: newMessage.message
            }
        }
    });
    console.log(conversation);
}

let getAllMessagesForConv = async (req, res, next) => {
    let firstUser = req.query.firstUser;
    let secondUser = req.query.secondUser;

    let conversation = await messages.findOne({
        parties: {
            $all: [firstUser, secondUser]
        }
    });


    if (!conversation) {
        let newArray = [];
        let newConverstation = new messages({
            parties: [
                firstUser,
                secondUser
            ],
            messages: newArray
        })
        await newConverstation.save();
    }
    res.status(200).json(
        { messages: conversation.messages }
    );
}

module.exports = {
    persistMessage,
    getAllMessagesForConv
}