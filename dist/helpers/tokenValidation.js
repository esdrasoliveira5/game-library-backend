"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const StatusCode_1 = __importDefault(require("../enum/StatusCode"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const tokenValidation = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (token === undefined) {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: { error: 'Token not found' } };
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const { data: { id, email } } = decoded;
        const user = yield UserModel_1.default.getUser({ email });
        if (user === null || user.id !== id) {
            return { status: StatusCode_1.default.UNAUTHORIZED, response: { error: 'Invalid token' } };
        }
        return user;
    }
    catch (error) {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: { error: 'Invalid token' } };
    }
});
exports.default = tokenValidation;
