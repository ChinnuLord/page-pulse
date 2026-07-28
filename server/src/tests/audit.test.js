const request = require("supertest");
jest.mock("../models/Audit", () => ({
    find: jest.fn(() => ({
        sort: jest.fn().mockResolvedValue([])
    })),
    create: jest.fn()
}));
const app = require("../app");

describe("Audit API", () => {

    // Test 1
    test("Should reject invalid URL", async () => {

        const res = await request(app)
            .post("/api/audit")
            .send({
                url: "abcd"
            });

        expect(res.statusCode).toBe(400);

        expect(res.body.success).toBe(false);

        expect(res.body.error.code)
            .toBe("INVALID_URL");

    });

    // Test 2
    test("Should reject missing URL", async () => {

        const res = await request(app)
            .post("/api/audit")
            .send({});

        expect(res.statusCode).toBe(400);

        expect(res.body.success).toBe(false);

        expect(res.body.error.code)
            .toBe("URL_REQUIRED");

    });

    // Test 3
    test("Should return audit history", async () => {

        const res = await request(app)
            .get("/api/audit");

        expect(res.statusCode).toBe(200);

        expect(res.body.success)
            .toBe(true);

    });

});