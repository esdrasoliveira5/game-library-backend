import { NextFunction, Request, Response } from 'express';

const HandleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: `Erro: ${err.message}` });
};

export default {
  HandleError,
};
