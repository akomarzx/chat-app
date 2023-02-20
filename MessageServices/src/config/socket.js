let { Server } = require('socket.io');
let rabbitMq = require('../config/rabbitmq')
let socketServer;
module.exports.setUp = (httpServer) => {
    socketServer = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    })

    socketServer.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });

}

module.exports.onConnection = () => {
    socketServer.on('connection', (socket) => {
        const users = [];
        for (let [id, socket] of socketServer.of("/").sockets) {
            users.push({
                userId: id,
                username: socket.username
            })
        }
        socket.emit('users', users);

        socket.broadcast.emit('new user', ({ username: socket.username, userId: socket.id }));

        socket.on('disconnect', () => {
            socketServer.emit('user disconnected', socket.id);
        })

        socket.on('sent message', async (data) => {
            await rabbitMq.rabbit.sendNewMessage(data);
            socket.to(data.id).emit('recieve message', { message: data.message, username: data.username })
        })
    })

}