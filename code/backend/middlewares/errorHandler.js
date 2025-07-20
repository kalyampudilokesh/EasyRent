// backend/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
    console.error('Unhandled Backend Error:', err.message, err.stack); // Ensure this is present
};

module.exports = { errorHandler };