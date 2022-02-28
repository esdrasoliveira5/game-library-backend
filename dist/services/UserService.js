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
const StatusCode_1 = __importDefault(require("../enum/StatusCode"));
const createValidation_1 = __importDefault(require("../helpers/createValidation"));
const loginValidate_1 = __importDefault(require("../helpers/loginValidate"));
const passwordCrypt_1 = __importDefault(require("../helpers/passwordCrypt"));
const tokenGenerate_1 = __importDefault(require("../helpers/tokenGenerate"));
const tokenValidation_1 = __importDefault(require("../helpers/tokenValidation"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, password, avatar } = data;
    const validation = (0, createValidation_1.default)(data);
    if (validation)
        return validation;
    const hashedPassword = yield passwordCrypt_1.default.hashIt(password);
    const { id } = yield UserModel_1.default.create({
        name, lastName, email, password: hashedPassword, avatar,
    });
    const token = (0, tokenGenerate_1.default)(id, email);
    return { status: StatusCode_1.default.CREATED, response: { token } };
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const validation = (0, loginValidate_1.default)(email, password);
    if (validation)
        return validation;
    const result = yield UserModel_1.default.getUser({ email });
    if (result === null) {
        return { status: StatusCode_1.default.NOT_FOUND, response: { error: 'Invalid email' } };
    }
    const hashedPassword = yield passwordCrypt_1.default.compareIt(password, result.password);
    if (!hashedPassword) {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: { error: 'Invalid password' } };
    }
    const token = (0, tokenGenerate_1.default)(result.id, email);
    return { status: StatusCode_1.default.OK, response: { token } };
});
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    return { status: StatusCode_1.default.OK, response: { token } };
});
exports.default = {
    create,
    login,
    getUser,
};
