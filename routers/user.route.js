const express = require("express");

const userRoute = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const { userValidation } = require("../validators");
const { authMiddleware } = require("../middlewares/auth.middleware");

userRoute.route("/")
    .get(authMiddleware(["admin"]), getUsers)
    .post(authMiddleware(["admin"]) ,validate(userValidation.createUser.body) ,createUser)

userRoute.route("/:userId")
    .get(authMiddleware(["admin"]), getUserById)
    .delete(authMiddleware(["admin"]) ,deleteUser)
    .patch(authMiddleware(["admin"]), updateUser)

module.exports = userRoute
