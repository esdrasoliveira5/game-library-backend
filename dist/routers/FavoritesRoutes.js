"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = require("express");
const FavoritesController_1 = __importDefault(require("../controllers/FavoritesController"));
const router = (0, express_1.Router)();
router.post('/', FavoritesController_1.default.create);
exports.default = router;
