import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { ResponseError, ResponseToken, ResponseUser } from '../interfaces/StatusResponse';
import UserService from '../services/UserService';

const create = async (req: Request, resp: Response) => {
  const { name, lastName, email, password, avatar } = req.body as Omit<User, 'id'>;

  const { status, response }:
  ResponseToken | ResponseError = await UserService.create({
    name, lastName, email, password, avatar,
  });

  return resp.status(status).json(response);
};

const login = async (req: Request, resp: Response) => {
  const { email, password } = req.body as Omit<User, 'id, name, lastName, avatar'>;

  const { status, response }:
  ResponseToken | ResponseError = await UserService.login({ email, password });

  return resp.status(status).json(response);
};

const getUser = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { status, response }:
  ResponseUser | ResponseError = await UserService.getUser(authorization);

  return resp.status(status).json(response);
};

export default {
  create,
  login,
  getUser,
};