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
const CategoriesService_1 = __importDefault(require("../services/CategoriesService"));
const create = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { name } = req.body;
    const { status, response } = yield CategoriesService_1.default.create(authorization, { name });
    return resp.status(status).json(response);
});
const getAll = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { status, response } = yield CategoriesService_1.default.getAll(authorization);
    return resp.status(status).json(response);
});
const deleteC = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { id } = req.params;
    const data = { id: Number(id) };
    const { status, response } = yield CategoriesService_1.default.deleteC(authorization, data);
    return resp.status(status).json(response);
});
exports.default = {
    create,
    getAll,
    deleteC,
};
