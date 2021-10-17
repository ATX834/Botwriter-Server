"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typegoose_1 = require("@typegoose/typegoose");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var User_1 = __importDefault(require("./routes/User"));
var config_1 = __importStar(require("./config/config"));
typegoose_1.mongoose.connect(config_1.default.mongo_url).then(function () { return console.log("Connect to db"); });
config_1.app.use(cors_1.default);
config_1.app.use(express_1.default.json());
config_1.app.use("api/user/", User_1.default);
config_1.app.listen(config_1.default.port, function () {
    return console.log("Server is running on " + config_1.default.port);
});
