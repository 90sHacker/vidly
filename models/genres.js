const Joi = require('joi');
const mongoose = require('mongoose');

const Genres = mongoose.model('Genres', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
};

exports.Genres = Genres;
exports.validate = validateGenre;