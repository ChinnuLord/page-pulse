const axios = require("axios");
const cheerio = require("cheerio");
const Audit = require("../models/Audit");
const redisClient = require("../config/redis");

const pLimit = require("p-limit");
const limit = pLimit(5);

const auditWebsite = (url) =>
    limit(async () => {

    // Check Redis Cache
    const cacheKey = `audit:${url}`;

    let cachedAudit = null;

    try {
        if (redisClient?.isOpen) {
            cachedAudit = await redisClient.get(cacheKey);
        }
    } catch (err) {
        console.log("Redis unavailable. Continuing without cache.");
    }

        if (cachedAudit) {
            const cachedResult = JSON.parse(cachedAudit);

            cachedResult.cached = true;

            cachedResult.cacheAge = process.env.CACHE_TTL;

            return {
                success: true,
                source: "cache",
                audit: cachedResult
            };
        }

    const startTime = Date.now();

    let response;

    try {

        response = await axios.get(url, {
            timeout: 5000,
            validateStatus: () => true,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9"
            }
        });

    } catch (error) {

        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out");
        }

        if (
            error.code === "ENOTFOUND" ||
            error.code === "ECONNREFUSED"
        ) {
            throw new Error("Website is unreachable");
        }

        throw new Error("Unable to audit website");
    }

    const responseTime = Date.now() - startTime;

    const html = response.data;

    const $ = cheerio.load(html);

    // Page Title
    const title = $("title").text().trim();

    // Meta Description
    const metaDescription =
        $('meta[name="description"]').attr("content") || "";

    // Images
    const images = $("img");

    const totalImages = images.length;

    // Missing ALT Tags
    let missingAlt = 0;

    images.each((index, image) => {
        if (!$(image).attr("alt")) {
            missingAlt++;
        }
    });

    // Security Headers
    const securityHeaders = [];

    [
        "content-security-policy",
        "strict-transport-security",
        "x-frame-options",
        "x-content-type-options"
    ].forEach(header => {
        if (response.headers[header]) {
            securityHeaders.push(header);
        }
    });

    // HTML Size
    const pageSize = Buffer.byteLength(html, "utf8");

    // Save to MongoDB
    console.log("Saving audit to MongoDB...");
    const audit = await Audit.create({
        url,
        title,
        status: response.status,
        responseTime,
        pageSize,
        images: totalImages,
        missingAlt,
        metaDescription,
        securityHeaders,
        cached: false
    });
    console.log("Audit saved to MongoDB:", audit._id);
    // Save to Redis Cache
    try {
        if (redisClient?.isOpen) {
            await redisClient.set(
                cacheKey,
                JSON.stringify(audit),
                {
                    EX: parseInt(process.env.CACHE_TTL, 10) || 3600
                }
            );
        }
    } catch (err) {
        console.log("Redis unavailable. Cache not saved.");
    }

    return {
        success: true,
        audit
    };
});

module.exports = {
    auditWebsite
};