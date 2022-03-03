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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const HandleError_1 = __importDefault(require("./middlewares/HandleError"));
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const CollectionRouter_1 = __importDefault(require("./routers/CollectionRouter"));
const CategoriesRouter_ts_1 = __importDefault(require("./routers/CategoriesRouter.ts"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    return resp.status(200).json({
        message: 'API OLINE!!',
    });
}));
app.use('/user', UserRouter_1.default);
app.use('/collections', CollectionRouter_1.default);
app.use('/categories', CategoriesRouter_ts_1.default);
app.use(HandleError_1.default.HandleError);
exports.default = app;
