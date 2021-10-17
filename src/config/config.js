"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
var MONGO_HOST = "127.0.0.1:27017";
var DATABASE = "genLPM";
var MONGO = {
    host: MONGO_HOST,
    db: DATABASE,
    url: "mongodb://" + MONGO_HOST + "/" + DATABASE
};
var config = {
    mongo_url: MONGO.url,
    port: 5000,
};
exports.default = config;
