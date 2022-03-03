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
    const response = yield Client.user.create({
        data: Object.assign({}, data),
    });
    return response;
});
const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.user.findUnique({
        where: {
            email: data.email,
        },
    });
    return response;
});
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Client.user.update({
        where: {
            id: data.id,
        },
        data: Object.assign({}, data),
    });
    return response;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Client.collections.deleteMany({
        where: {
            userId: { equals: id },
        },
    });
    yield Client.categories.deleteMany({
        where: {
            userId: { equals: id },
        },
    });
    yield Client.user.delete({
        where: {
            id,
        },
    });
});
exports.default = {
    create,
    getUser,
    updateUser,
    deleteUser,
};
