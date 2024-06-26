const httpStatus = require("http-status");
const AppError = require("../utils/AppError");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
    });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(" - ");
        return next(new AppError(errorMessage, httpStatus.BAD_REQUEST));
    }

    req.body = value;
    return next();
};

module.exports = validate;
