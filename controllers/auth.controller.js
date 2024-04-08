const httpStatus = require("http-status");
const jwt =  require("jsonwebtoken");
const User = require("../models/user.model");
const { asyncHandle, AppError } = require("../utils");

const register = asyncHandle(async (req, res, next) => {
    const { email } = req.body
    const data = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new AppError("User already exists because email is in using!");
    }

    const newUser = await User.create(data);
    res.json({
        status: httpStatus.CREATED,
        message: "User registration successful",
        data: newUser
    })
})

module.exports = {
    register,
}
