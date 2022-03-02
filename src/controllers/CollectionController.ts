import { Collections, Games } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http2';
import {
  ResponseCollections,
  ResponseError,
  ResponseUpdateDelete,
} from '../interfaces/StatusResponse';
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

const getAll = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { page } = req.params;
  const { status, response }:
  ResponseCollections | ResponseError = await CollectionsServices.getAll(
    authorization, 
    Number(page),
  );
  return resp.status(status).json(response);
};

const getAllByCategory = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { id, page } = req.params;
  const data = { categoriesId: Number(id) };

  const { status, response }:
  ResponseCollections | ResponseError = await CollectionsServices.getAllByCategory(
    authorization, 
    data,
    Number(page),
  );
  return resp.status(status).json(response);
};

const update = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { gamesId, categoriesId } = req.body as Omit<Collections, 'userId'>; 
  const data = { gamesId, categoriesId };

  const { status, response }:
  ResponseUpdateDelete | ResponseError = await CollectionsServices.update(authorization, data);
  return resp.status(status).json(response);
};

const deleteC = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { gamesId } = req.body as Omit<Collections, 'userId'>; 
  const data = { gamesId };

  const { status, response }:
  ResponseUpdateDelete | ResponseError = await CollectionsServices.deleteC(authorization, data);
  return resp.status(status).json(response);
};

export default {
  create,
  find,
  getAll,
  getAllByCategory,
  update,
  deleteC,
};
