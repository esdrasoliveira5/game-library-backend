import { Games } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import FavoritesServices from '../services/FavoritesServices';

const create = async (req: Request, resp: Response) => {
  const { idGame, name, image } = req.body as Omit<Games, 'id'>;
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const data = { idGame, name, image };
  const { status, response }:
  ResponseError | ResponseFavorites = await FavoritesServices.create(authorization, data);

  return resp.status(status).json(response);
};

export default {
  create,
};