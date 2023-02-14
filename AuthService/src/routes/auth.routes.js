const express = require('express');
const passport = require('passport');

let authRouter = express.Router();
let authController = require('../controller/auth.controller');

let requireAuth = function (req, res, next) {
    passport.authenticate('tokencheck', { session: false },
        function (err, user, info) {
            if (err) return res.status(401).json(
                {
                    success: false,
                    message: getErrorMessage(err)
                }
            );
            if (info) return res.status(401).json(
                {
                    success: false,
                    message: info.message
                }
            );

            req.payload = user;
            next();
        })(req, res, next);
}


authRouter.post('/login', authController.signIn);
authRouter.post('/register', authController.signUp);
authRouter.get('/authenticate', authController.authenticate);
authRouter.get('/user', requireAuth, authController.getUser);

module.exports = authRouter;