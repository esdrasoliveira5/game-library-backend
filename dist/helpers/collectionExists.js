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
const CollectionsModel_1 = __importDefault(require("../models/CollectionsModel"));
const collectionExists = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield CollectionsModel_1.default.find(data);
    if (collection === undefined || collection[0] === undefined) {
        return { status: StatusCode_1.default.BAD_REQUEST, response: { error: 'Game not in Collection' } };
    }
    return collection[0];
});
exports.default = collectionExists;
