const redisClient = require("../config/redis");

afterAll(async () => {
    try {
        if (redisClient && redisClient.isOpen) {
            await Promise.race([
                redisClient.quit(),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);
        }
    } catch (err) {
        // Ignore cleanup errors
    }
});