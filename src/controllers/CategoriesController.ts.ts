import { Categories } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http2';
import {
  ResponseCategories,
  ResponseError,
} from '../interfaces/StatusResponse';
import CategoriesService from '../services/CategoriesService';

const create = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { name } = req.body as Categories; 
  
  const { status, response }:
  ResponseCategories | ResponseError = await CategoriesService.create(authorization, { name });
  return resp.status(status).json(response);
};

const getAll = async (req: Request, resp: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;

  const { status, response }:
  ResponseCategories | ResponseError = await CategoriesService.getAll(authorization);
  return resp.status(status).json(response);
};

export default {
  create,
  getAll,
};
