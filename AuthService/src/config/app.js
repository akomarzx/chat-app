let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let app = express();
let passport = require('passport');
let User = require('../models/user');

app.use(cors());
app.options('', cors());

// Passport Setup
const passportConfig = require('./passport')(passport);
app.use(passport.initialize());
passport.use(User.createStrategy());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', require('../routes/auth.routes'));

app.use

module.exports = app;
