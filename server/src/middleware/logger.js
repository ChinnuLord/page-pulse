const pinoHttp = require("pino-http");
const logger = require("../config/logger");

module.exports = pinoHttp({
    logger,

    genReqId(req) {
        return req.requestId;
    },

    customSuccessMessage(req, res) {
        return `${req.method} ${req.url} completed`;
    },

    customErrorMessage(req, res) {
        return `${req.method} ${req.url} failed`;
    },
});