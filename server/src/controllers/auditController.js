const validateUrl = require("../utils/validateUrl");
const {
    auditWebsite,
} = require("../services/auditService");
const Audit = require("../models/Audit");

const audit = async (req, res, next) => {
    try {
        const { url } = req.body;

        if (!url) {
            const error = new Error("URL is required");
            error.statusCode = 400;
            error.code = "URL_REQUIRED";
            throw error;
        }

        if (!validateUrl(url)) {
            const error = new Error("Invalid URL");
            error.statusCode = 400;
            error.code = "INVALID_URL";
            throw error;
        }

        const result = await auditWebsite(url);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getAuditHistory = async (req, res, next) => {
    try {
        const audits = await Audit.find().sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            count: audits.length,
            audits,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    audit,
    getAuditHistory,
};