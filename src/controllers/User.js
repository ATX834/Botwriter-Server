"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findOneBy = exports.find = exports.create = void 0;
var User_1 = __importDefault(require("../models/User"));
var create = function (req, res) {
    User_1.default.create(req.body)
        .then(function (result) {
        res.json({
            success: true,
            result: result,
            message: "Username " + req.body.username + " has been created.",
        });
    })
        .catch(function (err) {
        console.log(err);
    });
};
exports.create = create;
var find = function (req, res) {
    User_1.default.find()
        .then(function (result) {
        res.json({
            success: true,
            result: result,
        });
    })
        .catch(function (err) {
        res.json({
            success: false,
            err: err,
        });
    });
};
exports.find = find;
var findOneBy = function (req, res) {
    User_1.default.findOne(req.params)
        .then(function (result) {
        res.json({
            success: true,
            result: result,
        });
    })
        .catch(function (err) {
        res.json({
            success: false,
            err: err,
        });
    });
};
exports.findOneBy = findOneBy;
var update = function (req, res) {
    User_1.default.findOneAndUpdate(req.params, req.body)
        .then(function () {
        res.json({
            success: true,
            message: "Username " + req.params.username + " has been updated.",
        });
    })
        .catch(function (err) {
        console.log(err);
    });
};
exports.update = update;
var remove = function (req, res) {
    User_1.default.findOneAndDelete(req.params)
        .then(function () {
        res.json({
            success: true,
            message: "Username " + req.params.username + " has been deleted.",
        });
    })
        .catch(function (err) {
        console.log(err);
    });
};
exports.remove = remove;
