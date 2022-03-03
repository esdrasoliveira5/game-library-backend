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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Client = new client_1.PrismaClient();
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.collections.create({
        data: Object.assign({}, data),
    });
    return response;
});
const find = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.collections.findMany({
        where: {
            userId: {
                equals: data.userId,
            },
            gamesId: {
                equals: data.gamesId,
            },
        },
    });
    return response;
});
const getAll = (data, page) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.collections.findMany({
        skip: page,
        take: 20,
        where: {
            userId: {
                equals: data.userId,
            },
        },
        select: {
            userId: true,
            gamesId: true,
            categoriesId: true,
            games: true,
        },
    });
    return response;
});
const getAllByCategory = (data, page) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.collections.findMany({
        skip: page,
        take: 20,
        where: {
            userId: { equals: data.userId },
            categoriesId: { equals: data.categoriesId },
        },
        select: {
            userId: true,
            gamesId: true,
            categoriesId: true,
            games: true,
        },
    });
    return response;
});
const update = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.collections.updateMany({
        where: {
            userId: {
                equals: data.userId,
            },
            gamesId: {
                equals: data.gamesId,
            },
        },
        data: {
            categoriesId: data.categoriesId,
        },
    });
    return response;
});
const deleteC = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.collections.deleteMany({
        where: {
            userId: {
                equals: data.userId,
            },
            gamesId: {
                equals: data.gamesId,
            },
        },
    });
    return response;
});
exports.default = {
    create,
    find,
    getAll,
    getAllByCategory,
    update,
    deleteC,
};
