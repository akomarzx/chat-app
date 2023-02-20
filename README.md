RabbitMq Port: 5672
RabbitMq Management Port: 15672

Authentication Service Port: 3001
Auth Mongo Express: 3003
Auth DB user: admin
Auth DB pass: admin

Message Service will be used to send and receive message no Database for this service
There will be a message broker that will sit between this service and MessagePersist
A seperate service will be used to persist messages.
Message Service Port:: 5001

UI Port : 4200

MessagePersistService PORT: 6001
MessagePersist Db port: 6002
Message Persist Mongo-express port : 6003
db-user: admin
db-pass: admin