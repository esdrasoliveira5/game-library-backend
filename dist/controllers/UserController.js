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
const UserService_1 = __importDefault(require("../services/UserService"));
const create = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, email, password, avatar } = req.body;
    const { status, response } = yield UserService_1.default.create({
        name, lastName, email, password, avatar,
    });
    return resp.status(status).json(response);
});
const login = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { status, response } = yield UserService_1.default.login({ email, password });
    return resp.status(status).json(response);
});
const getUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { status, response } = yield UserService_1.default.getUser(authorization);
    return resp.status(status).json(response);
});
exports.default = {
    create,
    login,
    getUser,
};
