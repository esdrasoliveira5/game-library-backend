"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const StatusCode_1 = __importDefault(require("../enum/StatusCode"));
const createValidation = (data) => {
    const { name, lastName, email, password, avatar } = data;
    const { error } = joi_1.default.object({
        name: joi_1.default.string().not().empty().required(),
        lastName: joi_1.default.string().not().empty().required(),
        email: joi_1.default.string().not().empty().required(),
        password: joi_1.default.string().min(8).max(12).required(),
        avatar: joi_1.default.string().not().empty().required(),
    }).validate({ name, lastName, email, password, avatar });
    if (error) {
        return { status: StatusCode_1.default.BAD_REQUEST, response: { error: error.details[0].message } };
    }
};
exports.default = createValidation;
