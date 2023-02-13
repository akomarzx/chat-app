const express = require('express');

let authRouter = express.Router();
let authController = require('../controller/auth.controller');

authRouter.post('/login', authController.signIn);
authRouter.post('/register', authController.signUp);
authRouter.get('/authenticate', authController.authenticate);

module.exports = authRouter;