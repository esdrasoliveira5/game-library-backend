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
const CategoriesModel_1 = __importDefault(require("../models/CategoriesModel"));
const error = { error: 'Cannot delete category' };
// eslint-disable-next-line complexity
const verifyCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield CategoriesModel_1.default.findById(data);
    if (findCategory === null) {
        return true;
    }
    if (findCategory.name === 'Sem Categoria') {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: error };
    }
    if (findCategory.name === 'Jogando') {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: error };
    }
    if (findCategory.name === 'Completo') {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: error };
    }
    if (findCategory.name === 'Completo') {
        return { status: StatusCode_1.default.UNAUTHORIZED, response: error };
    }
    return true;
});
exports.default = verifyCategory;
