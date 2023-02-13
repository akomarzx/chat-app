const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;

module.exports = function (passport) {

    passport.use(
        'tokencheck',
        new JWTstrategy(
            {
                secretOrKey: process.env.SECRETKEY || 'this is not a secured secret',
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    return done(null, token.payload);
                } catch (error) {
                    console.log(error);
                    done(error);
                }
            }
        )
    );
};
