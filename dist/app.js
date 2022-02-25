"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const HandleError_1 = __importDefault(require("./middlewares/HandleError"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(HandleError_1.default.HandleError);
exports.default = app;
