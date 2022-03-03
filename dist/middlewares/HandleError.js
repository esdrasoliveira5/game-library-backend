"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const HandleError = (err, _req, res, _next) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        console.log(err);
        return res.status(500).json({ error: 'email already registered' });
    }
    console.error(err);
    return res.status(500).json({ error: `Erro: ${err.message}` });
};
exports.default = {
    HandleError,
};
