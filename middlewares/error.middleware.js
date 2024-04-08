const errorMiddleware = (err, req, res, next) => {
    const errorMessage = err.message.replace(/"/g, '');
    return res.json({
        status: err.status,
        message: errorMessage
    })
}

module.exports = errorMiddleware
