let amqp = require('amqplib');

let rabbitConnection;
let channel;
let queue;
module.exports.rabbit = {

    connect: async () => {
        try {
            rabbitConnection = await amqp.connect('amqp://localhost:5672');
        } catch (error) {
            console.log(error.stack)
        }
        console.log('Connected To RabbitMq')

        queue = 'NEW_MESSAGE';

        channel = await rabbitConnection.createChannel();

        channel.assertQueue(queue);
    },

    sendNewMessage: async (message) => {
        let newMessage = Buffer.from(JSON.stringify(message));
        channel.sendToQueue(queue, newMessage);
    }

}
