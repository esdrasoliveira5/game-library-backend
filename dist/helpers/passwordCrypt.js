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
const bcrypt = require('bcrypt');
function hashIt(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(6);
        const hashed = yield bcrypt.hash(password, salt);
        return hashed;
    });
}
function compareIt(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const validPassword = yield bcrypt.compare(password, hashedPassword);
        return validPassword;
    });
}
exports.default = {
    hashIt,
    compareIt,
};
