"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../controllers/User");
var router = (0, express_1.Router)();
router.post("/", User_1.create);
router.get("/", User_1.find);
router.get("/:username", User_1.findOneBy);
router.put("/:username", User_1.update);
router.delete("/:username", User_1.remove);
exports.default = router;
