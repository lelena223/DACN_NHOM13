const express = require("express");

const userRoute = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user.controller")

userRoute.route("/").get(getUsers).post(createUser)

userRoute.route("/:userId").get(getUserById).delete(deleteUser).patch(updateUser)

module.exports = userRoute
