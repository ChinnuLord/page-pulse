require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

console.log("URI:", uri);

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected!");
        await client.close();
    } catch (err) {
        console.error(err);
    }
}

run();