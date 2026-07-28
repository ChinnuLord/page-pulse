const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
    logger.error({
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl,
        error: err.message,
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        requestId: req.requestId,
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message:
                err.message || "Something went wrong.",
        },
    });
};

module.exports = errorHandler;