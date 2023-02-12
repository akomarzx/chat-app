let mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://admin:admin@localhost:3002/';

module.exports = async () => {

    mongoose.connect(mongoUrl, {
        dbName: 'chat-app'
    });

    let mongoDb = mongoose.connection;

    mongoDb.on('error', console.error.bind(console, 'Connection Error'));
    mongoDb.once('open', () => {
        console.log('Connected to MongoDb');
    })

    return mongoDb;
}