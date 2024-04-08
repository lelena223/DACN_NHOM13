const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { asyncHandle, AppError } = require("../utils")
const User = require("../models/user.model")

const authMiddleware = (roleAllow) => asyncHandle(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('Invalid token!', httpStatus.UNAUTHORIZED));
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY || 'secret-key');

    const { userId } = payload;
    const user = await User.findById(userId);
    if(!user){
        throw new AppError("Invalid token!", httpStatus.UNAUTHORIZED);
    }

    const isAuthorized = roleAllow.includes(user.role);

    if (!isAuthorized) {
        return next(new AppError('Unauthorized!', httpStatus.UNAUTHORIZED));
    }
    req.user = user
    next();
})

module.exports = {
    authMiddleware,
}
