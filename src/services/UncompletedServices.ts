import { Favorites, Games, Uncompleted, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import gameCompleted from '../helpers/gameCompleted';
import gameExist from '../helpers/gameExist';
import gameUncompleted from '../helpers/gameUncompleted';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import UncompletedModel from '../models/UncompletedModel';

const ERR_COMPLETED = { error: 'Game already in Completed list' };
const ERR_INCOMPLETED = { error: 'Game already in Uncompleted list' };

const create = async (token: string | undefined, data: Omit<Games, 'id'>):
Promise<ResponseFavorites | ResponseError> => {
  const validationToken: ResponseError | User = await tokenValidation(token);
  const gameValid = await gameExist(data);

  if ('status' in validationToken) return validationToken;
  if ('status' in gameValid) return gameValid;

  const uncompletedData: Omit<Uncompleted, 'id'> = {
    userId: validationToken.id, 
    gamesId: gameValid.id,
  };

  const gameC = await gameCompleted(uncompletedData);
  if (gameC !== undefined) return { status: StatusCode.BAD_REQUEST, response: ERR_COMPLETED };
  
  const gameU = await gameUncompleted(uncompletedData);
  if (gameU !== undefined) return { status: StatusCode.BAD_REQUEST, response: ERR_INCOMPLETED };

  const uncompletedResponse : Favorites = await UncompletedModel.create(uncompletedData);

  return { status: StatusCode.OK, response: uncompletedResponse };
};

const getOne = async (token: string | undefined, data: Omit<Games, 'id' | 'image' | 'name'>):
Promise<ResponseError | ResponseFavorites> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  const game: ResponseError | Games = await gameExist(data);
  if ('status' in validationToken) return validationToken;
  if ('status' in game) return game;

  const uncompletedData: Omit<Uncompleted, 'id'> = {
    userId: validationToken.id, 
    gamesId: game.id,
  };
  const uncompleted = await gameUncompleted(uncompletedData);
  
  if ('status' in uncompleted) return uncompleted;
  return { status: StatusCode.OK, response: uncompleted };
};

export default {
  create,
  getOne,
};