const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const healthRoutes = require("./routes/healthRoutes");
const auditRoutes = require("./routes/auditRoutes");
const limiter = require("./middleware/rateLimiter");
const requestId = require("./middleware/requestId");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(requestId);
app.use(logger);
app.use(limiter);


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Page Pulse API"
    });
});

app.use("/health", healthRoutes);
app.use("/api/audit", auditRoutes);

app.use(errorHandler);

module.exports = app;