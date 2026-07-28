const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Page Pulse API is running",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    healthCheck
};