import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const HandleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    console.log(
      'There is a unique constraint violation, a new user cannot be created with this email',
    );
    return res.status(500).json({ error: 'email already registered' });
  }
  console.error(err);
  return res.status(500).json({ error: `Erro: ${err.message}` });
};

export default {
  HandleError,
};
