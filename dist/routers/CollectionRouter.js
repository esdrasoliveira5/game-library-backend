"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = require("express");
const CollectionController_1 = __importDefault(require("../controllers/CollectionController"));
const router = (0, express_1.Router)();
router.post('/', CollectionController_1.default.create);
router.put('/update', CollectionController_1.default.update);
router.delete('/delete', CollectionController_1.default.deleteC);
router.get('/user/:page', CollectionController_1.default.getAll);
router.get('/user/:page/:id', CollectionController_1.default.getAllByCategory);
router.get('/:id', CollectionController_1.default.find);
exports.default = router;
