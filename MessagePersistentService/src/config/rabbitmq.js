const rabbit = require('amqplib');
const messageController = require('../controllers/messageController')

module.exports.connect = async () => {

    let rabbitConnection;
    try {
        rabbitConnection = await rabbit.connect('amqp://localhost:5672');
    } catch (error) {
        console.log(error.stackTrace)
    }
    console.log('Connected To RabbitMq')

    const queue = 'NEW_MESSAGE';

    let channel = await rabbitConnection.createChannel();

    channel.assertQueue(queue);

    channel.consume(queue, async (message) => {
        await messageController.persistMessage(message);
        // channel.ack(message);
    }, {
        noAck: false
    })
}