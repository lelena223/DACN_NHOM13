const Joi = require("joi");

const createUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
            .message('Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long'),
        birth: Joi.date().optional().max("now").messages({
            'date.max': 'invalid date of birth!',
        }),
        gender: Joi.string().valid("Nam", "Nữ").messages({
            'any.only': 'invalid gender!',
        }),
        phone: Joi.string().pattern(new RegExp('^[0-9]{10}$'))
            .message('Phone number must be exactly 10 digits'),
        role: Joi.string().valid("user", "admin").messages({
            'any.only': 'invalid role!',
        }),
    }),
    
}

module.exports = {
    createUser
}
