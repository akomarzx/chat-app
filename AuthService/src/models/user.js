const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        validate: [(password) => {
            return password && password.length > 6;
        }, 'Password should be longer']
    },
    salt: {
        type: String
    }
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.plugin(passportLocalMongoose, {
    saltlen: 16,
    keylen: 64,
    digestAlgorithm: 'sha512',
    iterations: 10000,
    encoding: 'base64',
    hashField: 'password'
});

module.exports = mongoose.model('Users', UserSchema);

