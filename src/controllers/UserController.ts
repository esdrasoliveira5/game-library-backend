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

const login = async (req: Request, resp: Response) => {
  const { email, password } = req.body as Omit<User, 'id, name, lastName, picture'>;

  const { status, response } = await UserService.login({ email, password });

  return resp.status(status).json(response);
};

export default {
  create,
  login,
};