const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');
const { Genres } = require('./genres');

const Movies = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 50
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: 
    {
        type: Genres.schema,
        required: true
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number(),
        genreId: Joi.string().required()
    });

    return schema.validate(movie);
};

exports.Movies = Movies;
exports.validate = validateMovie; 