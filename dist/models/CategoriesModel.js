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
    const response = yield Client.categories.create({
        data: Object.assign({}, data),
    });
    return response;
});
const createMany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.categories.createMany({
        data: [
            { name: 'Sem categoria', userId: data.userId },
            { name: 'Jogando', userId: data.userId },
            { name: 'Completo', userId: data.userId },
            { name: 'Não joguei', userId: data.userId },
        ],
        skipDuplicates: true,
    });
    return response;
});
const find = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.categories.findMany({
        where: {
            userId: {
                equals: data.userId,
            },
            name: {
                equals: data.name,
            },
        },
    });
    return response[0];
});
const findById = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.categories.findUnique({
        where: {
            id: data.id,
        },
    });
    return response;
});
const getAll = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.categories.findMany({
        where: {
            userId: data.userId,
        },
    });
    return response;
});
const deleteC = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.categories.delete({
        where: {
            id: data.id,
        },
    });
    return response;
});
exports.default = {
    create,
    createMany,
    find,
    findById,
    getAll,
    deleteC,
};
