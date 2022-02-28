"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const StatusCode_1 = __importDefault(require("../enum/StatusCode"));
const loginValidate = (email, password) => {
    const { error } = joi_1.default.object({
        email: joi_1.default.string().not().empty().required(),
        password: joi_1.default.string().min(8).max(12).required(),
    }).validate({ email, password });
    if (error) {
        return { status: StatusCode_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
    }
};
exports.default = loginValidate;
