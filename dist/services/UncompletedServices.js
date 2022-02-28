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
const tokenValidation_1 = __importDefault(require("../helpers/tokenValidation"));
const GamesModel_1 = __importDefault(require("../models/GamesModel"));
const UncompletedModel_1 = __importDefault(require("../models/UncompletedModel"));
const create = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validationToken = yield (0, tokenValidation_1.default)(token);
    if ('status' in validationToken)
        return validationToken;
    const gameResponse = yield GamesModel_1.default.create(data);
    const umcompletedData = {
        userId: validationToken.id,
        gamesId: gameResponse.id,
    };
    const uncompletedResponse = yield UncompletedModel_1.default.create(umcompletedData);
    return { status: StatusCode_1.default.OK, response: uncompletedResponse };
});
exports.default = {
    create,
};
