const passport = require('passport');
const jwt = require('jsonwebtoken')
let User = require('../models/user')

function getErrorMessage(err) {
    console.log(err);
    let message = '';

    if (err.message) {
        message = err.message;
    }
    if (err.code) {
        switch (err.code) {
            default:
                message = 'Invalid Credentials';
        }
    }
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

let logIn = async (req, res, next) => {
    passport.authenticate(
        'local',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    return res.status(401).json(
                        {
                            success: false,
                            message: err || info.message
                        }
                    );
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) {
                            return next(error);
                        }

                        // Generating the JWT token.
                        const payload =
                        {
                            subject: user._id,
                        };
                        const token = jwt.sign(
                            {
                                payload: payload
                            },
                            process.env.SECRETKEY || 'this is not a secured secret',
                            {
                                algorithm: 'HS512',
                                expiresIn: "30min"
                            }
                        );

                        return res.json(
                            {
                                success: true,
                                token: token,
                            }
                        );
                    }
                );
            } catch (error) {

                console.log(error);
                return res.status(403).json(
                    {
                        success: false,
                        message: getErrorMessage(error)
                    });
            }
        }
    )(req, res, next);
}

// TODO: Move Into Service Layer
let register = async (req, res, next) => {
    let user = new User(req.body);

    user.save((err) => {
        if (err) {
            let message = getErrorMessage(err);

            return res.status(401).json(
                {
                    success: false,
                    message: message
                }
            );
        }
        return res.json(
            {
                success: true,
                message: 'Registration is successfull!'
            }
        );
    });
};

let authenticate = async (req, res, next) => {
    passport.authenticate(
        'tokencheck',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    return res.status(401).json(
                        {
                            isAuthenticated: false,
                            message: err || info.message
                        }
                    );
                }
                return res.status(200).json(
                    {
                        isAuthenticated: true
                    }
                )
            } catch (error) {

                console.log(error);
                return res.status(401).json(
                    {
                        isAuthenticated: false,
                        message: getErrorMessage(error)
                    });
            }
        }
    )(req, res, next);
}

module.exports = {
    signIn: logIn,
    signUp: register,
    authenticate
}