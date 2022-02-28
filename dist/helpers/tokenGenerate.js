"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
const tokenGenerate = (id, email) => {
    const token = jsonwebtoken_1.default.sign({ data: { id, email } }, secret, jwtConfig);
    return token;
};
exports.default = tokenGenerate;
