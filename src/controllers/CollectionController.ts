import { Games } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http2';
import { ResponseCollections, ResponseError } from '../interfaces/StatusResponse';
import CollectionsServices from '../services/CollectionsServices';

const create = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { id, name, image } = req.body as Games; 
  
  const data = { id, name, image };
  const { status, response }:
  ResponseCollections | ResponseError = await CollectionsServices.create(authorization, data);

  return resp.status(status).json(response);
};

const find = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { id } = req.params;
  const data = { id: Number(id) };
  const { status, response }:
  ResponseCollections | ResponseError = await CollectionsServices.find(authorization, data);

  return resp.status(status).json(response);
};

export default {
  create,
  find,
};
