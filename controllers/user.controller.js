const User = require("../models/user.model");
const httpStatus = require('http-status');
const {asyncHandle, AppError} = require("../utils/index")

const getUsers = asyncHandle(async (req, res, next) => {
    const users = await User.find();
    res.json({
        status: httpStatus.OK,
        message: "Get users succeed",
        data: users
    })
})

const getUserById = asyncHandle(async (req, res, next) => {
    const userId = req.params.userId
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User is not found", httpStatus.NOT_FOUND);
    }
    res.json({
        status: httpStatus.OK,
        message: "Get user succeed",
        data: user
    })
})

const createUser = asyncHandle(async (req, res, next) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email is already in use", httpStatus.BAD_REQUEST);
    }
    const data = req.body
    const newUser = await User.create(data);
    res.json({
        status: httpStatus.CREATED,
        message: "User created successfully",
        data: newUser
    });
});

const updateUser = asyncHandle(async (req, res, next) => {
    const userId = req.params.userId;
    const dataToUpdate = req.body;
    const updateUser = await User.findByIdAndUpdate(userId, dataToUpdate, { new: true });
    if (!updateUser) {
        throw new AppError("User is not found", httpStatus.NOT_FOUND);
    }
    res.json({
        status: httpStatus.OK,
        message: 'User updated successfully!',
        data: updateUser,
    });
});

const deleteUser = asyncHandle(async (req, res, next) => {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new AppError("User is not found", httpStatus.NOT_FOUND);
    }
    res.json({
        status: httpStatus.OK,
        message: 'User deleted successfully!',
        data: deletedUser,
    });
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
