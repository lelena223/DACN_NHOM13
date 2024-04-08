const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../controllers/auth.controller")

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

module.exports = authRouter
