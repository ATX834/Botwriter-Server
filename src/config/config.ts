import express from "express";

export const app = express()

const MONGO_HOST = "127.0.0.1:27017"
const DATABASE = "genLPM";

const MONGO = {
    host: MONGO_HOST,
    db: DATABASE,
    url: `mongodb://${MONGO_HOST}/${DATABASE}`
}

const config = {
    mongo_url : MONGO.url,
    port : 5000,
}

export default config;