import { Games } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import UncompletedServices from '../services/UncompletedServices';

const create = async (req: Request, resp: Response) => {
  const { idGame, name, image } = req.body as Omit<Games, 'id'>;
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const data = { idGame, name, image };

  const { status, response }:
  ResponseError | ResponseFavorites = await UncompletedServices.create(authorization, data);

  return resp.status(status).json(response);
};

const getOne = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const idGame = Number(id);
  const { status, response }: 
  ResponseError | ResponseFavorites = await UncompletedServices.getOne(authorization, {
    idGame,
  });

  return resp.status(status).json(response);
};

export default {
  create,
  getOne,
};