import { Completed, Favorites, Games, Uncompleted, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import GamesModel from '../models/GamesModel';
import UncompletedModel from '../models/UncompletedModel';

const create = async (token: string | undefined, data: Omit<Games, 'id'>):
Promise<ResponseFavorites | ResponseError> => {
  const validationToken: ResponseError | User = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const game: Games | null = await GamesModel.getGame(data);
  if (game === null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game Not Found' } };
  }

  const uncompletedData: Omit<Completed, 'id'> = {
    userId: validationToken.id, 
    gamesId: game.id,
  };

  const getUncompleted:
  Uncompleted | null = await UncompletedModel.getUncompleted(uncompletedData);
  
  if (getUncompleted !== null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game already Uncompleted' } };
  }

  const uncompletedResponse : Favorites = await UncompletedModel.create(uncompletedData);

  return { status: StatusCode.OK, response: uncompletedResponse };
};

export default {
  create,
};