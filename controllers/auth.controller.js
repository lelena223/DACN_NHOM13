const httpStatus = require("http-status");
const jwt =  require("jsonwebtoken");
const User = require("../models/user.model");
const { asyncHandle, AppError } = require("../utils");
const bcrypt = require("bcrypt");

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

const login = asyncHandle(async (req, res, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email}).select("+password");
    if(!existingUser){
        throw new AppError("Email or password is incorrect!", httpStatus.BAD_REQUEST);
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordMatch){
        throw new AppError("Password is incorrect!", httpStatus.BAD_REQUEST);
    }

    const accessToken = await jwt.sign(
        { userId: existingUser.id }, 
        process.env.SECRET_KEY || "secret-key", 
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
    );
    res.json({
        status: httpStatus.OK,
        message: "Login successfully!",
        token: accessToken
    })
})

module.exports = {
    register,
    login
}
