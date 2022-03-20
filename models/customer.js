const Joi = require('joi');
const mongoose = require('mongoose');

const Customers = mongoose.model('Customers', new mongoose.Schema({
    isGold: Boolean,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        length: 11
    }
}));

//create joi validation fn
function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).required(),
        phone: Joi.string().length(11).required()
    })

    return schema.validate(customer);
}

exports.Customers = Customers;
exports.validate = validateCustomer;