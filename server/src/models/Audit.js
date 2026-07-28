const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: String,
    status: Number,
    responseTime: Number,
    pageSize: Number,
    images: Number,
    missingAlt: Number,
    metaDescription: {
        type: String,
        default: ""
    },
    securityHeaders: [String],
    cached: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Audit", auditSchema);