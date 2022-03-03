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
const collectionExists_1 = __importDefault(require("../helpers/collectionExists"));
const createGameIfnotExist_1 = __importDefault(require("../helpers/createGameIfnotExist"));
const createInitialCategories_1 = __importDefault(require("../helpers/createInitialCategories"));
const tokenValidation_1 = __importDefault(require("../helpers/tokenValidation"));
const CollectionsModel_1 = __importDefault(require("../models/CollectionsModel"));
const create = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const game = yield (0, createGameIfnotExist_1.default)(data);
    const findData = { name: 'Sem categoria', userId: validationToken.id };
    const iCategory = yield (0, createInitialCategories_1.default)(findData);
    const collectionData = {
        userId: validationToken.id,
        gamesId: game.id,
        categoriesId: iCategory === undefined ? 1 : iCategory.id,
    };
    const collection = yield (0, collectionExists_1.default)(collectionData);
    if ('userId' in collection) {
        return { status: StatusCode_1.default.BAD_REQUEST, response: { error: 'Game already in Collection' } };
    }
    const newCollection = yield CollectionsModel_1.default.create(collectionData);
    return { status: StatusCode_1.default.CREATED, response: newCollection };
});
const find = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const collectionData = {
        userId: validationToken.id,
        gamesId: data.id,
    };
    const collection = yield (0, collectionExists_1.default)(collectionData);
    if ('status' in collection)
        return collection;
    return { status: StatusCode_1.default.CREATED, response: collection };
});
const update = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const collectionData = {
        userId: validationToken.id,
        gamesId: data.gamesId,
        categoriesId: data.categoriesId,
    };
    const collection = yield CollectionsModel_1.default.update(collectionData);
    if (collection.count === 0) {
        return { status: StatusCode_1.default.NOT_FOUND, response: { error: 'Game not found in collection' } };
    }
    return { status: StatusCode_1.default.CREATED, response: collection };
});
const getAll = (token, page) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const collectionData = {
        userId: validationToken.id,
    };
    const collection = yield CollectionsModel_1.default.getAll(collectionData, page);
    if (collection === undefined) {
        return { status: StatusCode_1.default.NOT_FOUND, response: { error: 'Collections empty' } };
    }
    return { status: StatusCode_1.default.CREATED, response: collection };
});
const getAllByCategory = (token, data, page) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const collectionData = {
        userId: validationToken.id,
        categoriesId: data.categoriesId,
    };
    const collection = yield CollectionsModel_1.default.getAllByCategory(collectionData, page);
    if (collection === undefined) {
        return { status: StatusCode_1.default.NOT_FOUND, response: { error: 'Collections empty' } };
    }
    return { status: StatusCode_1.default.CREATED, response: collection };
});
const deleteC = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const collectionData = {
        userId: validationToken.id,
        gamesId: data.gamesId,
    };
    const collection = yield CollectionsModel_1.default.deleteC(collectionData);
    if (collection.count === 0) {
        return { status: StatusCode_1.default.NOT_FOUND, response: { error: 'Game not found in collection' } };
    }
    return { status: StatusCode_1.default.CREATED, response: collection };
});
exports.default = {
    create,
    find,
    getAll,
    getAllByCategory,
    update,
    deleteC,
};
