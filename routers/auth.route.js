const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { loginValidation, authValidation } = require("../validators");

authRouter.route("/register").post(validate(authValidation.register.body) ,register);
authRouter.route("/login").post(validate(authValidation.login.body) ,login);

module.exports = authRouter
