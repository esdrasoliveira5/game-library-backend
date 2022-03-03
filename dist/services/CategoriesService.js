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
const createCategorieIfNotExist_1 = __importDefault(require("../helpers/createCategorieIfNotExist"));
const tokenValidation_1 = __importDefault(require("../helpers/tokenValidation"));
const verifyCategory_1 = __importDefault(require("../helpers/verifyCategory"));
const CategoriesModel_1 = __importDefault(require("../models/CategoriesModel"));
const create = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const categorie = yield (0, createCategorieIfNotExist_1.default)({ name: data.name, userId: validationToken.id });
    return { status: StatusCode_1.default.CREATED, response: categorie };
});
const getAll = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const categories = yield CategoriesModel_1.default.getAll({ userId: validationToken.id });
    if (categories === undefined || categories.length === 0) {
        return { status: StatusCode_1.default.NOT_FOUND, response: [] };
    }
    return { status: StatusCode_1.default.OK, response: categories };
});
const deleteC = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const categoryV = yield (0, verifyCategory_1.default)(data);
    if (categoryV !== true)
        return categoryV;
    const categorieData = { id: data.id };
    const category = yield CategoriesModel_1.default.deleteC(categorieData);
    if (category.id) {
        return { status: StatusCode_1.default.NOT_FOUND, response: { error: 'Category not found' } };
    }
    return { status: StatusCode_1.default.OK, response: category };
});
exports.default = {
    create,
    getAll,
    deleteC,
};
