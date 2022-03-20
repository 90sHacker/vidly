const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean
});

// encapsulate logic in a mongoose model
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('users', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(60).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(8).max(255).alphanum().required()
    })

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;