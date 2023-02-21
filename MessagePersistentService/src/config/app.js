var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const messageRouter = require('../routes/message.routes')
let cors = require('cors');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/messages', messageRouter);

module.exports = app;
