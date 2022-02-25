import { User } from '@prisma/client';
import { Request, Response } from 'express';
import UserService from '../services/UserService';

const create = async (req: Request, resp: Response) => {
  const { name, lastName, email, password, picture } = req.body as Omit<User, 'id'>;

  const { status, response } = await UserService.create({
    name, lastName, email, password, picture,
  });

  return resp.status(status).json(response);
};

export default {
  create,
};