"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleError = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: `Erro: ${err.message}` });
};
exports.default = {
    HandleError,
};
