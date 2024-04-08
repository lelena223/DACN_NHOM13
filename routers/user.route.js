const express = require("express");

const userRoute = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const { userValidation } = require("../validators");

userRoute.route("/").get(getUsers).post(validate(userValidation.createUser.body) ,createUser)

userRoute.route("/:userId").get(getUserById).delete(deleteUser).patch(updateUser)

module.exports = userRoute
