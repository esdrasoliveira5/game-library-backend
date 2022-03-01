import { Completed, Games, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import gameCompleted from '../helpers/gameCompleted';
import gameExist from '../helpers/gameExist';
import gameUncompleted from '../helpers/gameUncompleted';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import CompletedModel from '../models/CompletedModel';

const ERR_COMPLETED = { error: 'Game already in Completed list' };
const ERR_INCOMPLETED = { error: 'Game already in Uncompleted list' };

const create = async (token: string | undefined, data: Omit<Games, 'id'>):
Promise<ResponseFavorites | ResponseError> => {
  const validationToken: ResponseError | User = await tokenValidation(token);
  const gameValid = await gameExist(data);

  if ('status' in validationToken) return validationToken;
  if ('status' in gameValid) return gameValid;

  const completedData: Omit<Completed, 'id'> = {
    userId: validationToken.id,
    gamesId: gameValid.id,
  };

  const getCompleted = await gameCompleted(completedData);
  if (getCompleted === null) return { status: StatusCode.BAD_REQUEST, response: ERR_COMPLETED };
  
  const getUncompleted = await gameUncompleted(completedData);
  if (getUncompleted === null) return { status: StatusCode.BAD_REQUEST, response: ERR_INCOMPLETED };
  
  const completedResponse : Completed = await CompletedModel.create(completedData);
  return { status: StatusCode.OK, response: completedResponse };
};

const getOne = async (token: string | undefined, data: Omit<Games, 'id' | 'image' | 'name'>):
Promise<ResponseError | ResponseFavorites> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  const game: ResponseError | Games = await gameExist(data);
  if ('status' in validationToken) return validationToken;
  if ('status' in game) return game;

  const complitedData: Omit<Completed, 'id'> = {
    userId: validationToken.id, 
    gamesId: game.id,
  };
  const complited = await gameCompleted(complitedData);
  
  if ('status' in complited) return complited;
  return { status: StatusCode.OK, response: complited };
};

export default {
  create,
  getOne,
};