const express = require("express");
const authRouter = express.Router();
const { register } = require("../controllers/auth.controller")

authRouter.route("/register").post(register);

module.exports = authRouter
