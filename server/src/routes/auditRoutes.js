const express = require("express");
const router = express.Router();

const {
    audit,
    getAuditHistory
} = require("../controllers/auditController");

router.post("/", audit);
router.get("/", getAuditHistory);

module.exports = router;