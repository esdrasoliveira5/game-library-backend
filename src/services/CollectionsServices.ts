import { Collections, Games, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import collectionExists from '../helpers/collectionExists';
import createCategorie from '../helpers/createCategorieIfNotExist';
import createGame from '../helpers/createGameIfnotExist';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseCollections, ResponseError } from '../interfaces/StatusResponse';
import CollectionsModel from '../models/CollectionsModel';

const create = async (token: string | undefined, data: Games):
Promise<ResponseCollections | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const game: Games = await createGame(data);
  const categorie = await createCategorie({ name: 'Sem categoria' });
  
  const collectionData: Collections = {
    userId: validationToken.id, 
    gamesId: game.id,
    categoriesId: categorie.id,
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

export default {
  create,
  find,
};
