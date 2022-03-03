import { Collections, Games, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import collectionExists from '../helpers/collectionExists';
import createGame from '../helpers/createGameIfnotExist';
import initialCategories from '../helpers/createInitialCategories';
import tokenValidation from '../helpers/tokenValidation';
import {
  ResponseCollections, 
  ResponseError, 
  ResponseUpdateDelete,
} from '../interfaces/StatusResponse';
import CollectionsModel from '../models/CollectionsModel';

const create = async (token: string | undefined, data: Games):
Promise<ResponseCollections | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const game: Games = await createGame(data);
  const findData = { name: 'Sem categoria', userId: validationToken.id };
  const iCategory = await initialCategories(findData);
  
  const collectionData: Collections = {
    userId: validationToken.id, 
    gamesId: game.id,
    categoriesId: iCategory === undefined ? 1 : iCategory.id,
  };
  const collection = await collectionExists(collectionData);
  if ('userId' in collection) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game already in Collection' } };
  }
  const newCollection : Collections = await CollectionsModel.create(collectionData);

  return { status: StatusCode.CREATED, response: newCollection };
};

const find = async (token: string | undefined, data: Omit<Games, 'name' | 'image'>):
Promise<ResponseCollections | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const collectionData: Omit<Collections, 'categoriesId'> = {
    userId: validationToken.id, 
    gamesId: data.id,
  };

  const collection = await collectionExists(collectionData);
  if ('status' in collection) return collection;

  return { status: StatusCode.CREATED, response: collection };
};

const update = async (token: string | undefined, data: Omit<Collections, 'userId'>):
Promise<ResponseUpdateDelete | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  
  const collectionData: Collections = {
    userId: validationToken.id, 
    gamesId: data.gamesId,
    categoriesId: data.categoriesId,
  };

  const collection = await CollectionsModel.update(collectionData);
  if (collection.count === 0) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Game not found in collection' } };
  }
  return { status: StatusCode.CREATED, response: collection };
};

const getAll = async (token: string | undefined, page: number):
Promise<ResponseCollections | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const collectionData: Omit<Collections, 'gamesId' | 'categoriesId'> = {
    userId: validationToken.id, 
  };

  const collection = await CollectionsModel.getAll(collectionData, page);
  
  if (collection === undefined) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Collections empty' } };
  }
  return { status: StatusCode.CREATED, response: collection };
};

const getAllByCategory = async (
  token: string | undefined,
  data: Omit<Collections, 'userId' | 'gamesId'>,
  page: number,
): Promise<ResponseCollections | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const collectionData: Omit<Collections, 'gamesId'> = {
    userId: validationToken.id, 
    categoriesId: data.categoriesId,
  };

  const collection = await CollectionsModel.getAllByCategory(collectionData, page);
  
  if (collection === undefined) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Collections empty' } };
  }
  return { status: StatusCode.CREATED, response: collection };
};

const deleteC = async (
  token: string | undefined,
  data: Omit<Collections, 'userId' | 'categoriesId'>,
):
Promise<ResponseUpdateDelete | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  
  const collectionData: Omit<Collections, 'categoriesId'> = {
    userId: validationToken.id, 
    gamesId: data.gamesId,
  };

  const collection = await CollectionsModel.deleteC(collectionData);
  if (collection.count === 0) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Game not found in collection' } };
  }
  return { status: StatusCode.CREATED, response: collection };
};

export default {
  create,
  find,
  getAll,
  getAllByCategory,
  update,
  deleteC,
};
