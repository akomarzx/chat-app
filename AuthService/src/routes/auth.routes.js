const express = require('express');

let authRouter = express.Router();
let authController = require('../controller/auth.controller');

authRouter.post('/login', authController.signIn);
authRouter.post('/register', authController.signUp);

module.exports = authRouter;