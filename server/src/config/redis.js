const { createClient } = require("redis");

let redisClient = null;
let errorLogged = false;

try {
    redisClient = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    redisClient.on("error", () => {
        if (!errorLogged) {
            console.log("⚠️ Redis not available. Running without cache.");
            errorLogged = true;
        }
    });

    redisClient.connect().catch(() => { });
} catch (err) {
    console.log("⚠️ Redis disabled.");
}

module.exports = redisClient;