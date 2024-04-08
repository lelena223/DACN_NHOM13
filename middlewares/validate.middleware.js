const httpStatus = require("http-status");
const AppError = require("../utils/AppError");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
    const validSchema = Joi.validate(req.body, schema);
    
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

        if(error){
            const errorMessage = error.details.map((details) => details.message).join(" - ");
            return next(new AppError(errorMessage, httpStatus.BAD_REQUEST));
        }

        Object.assign(req, value);
        return next();
}

module.exports = validate
