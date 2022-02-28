import { Completed, Games, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import CompletedModel from '../models/CompletedModel';
import GamesModel from '../models/GamesModel';

const create = async (token: string | undefined, data: Omit<Games, 'id'>):
Promise<ResponseFavorites | ResponseError> => {
  const validationToken: ResponseError | User = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const game: Games | null = await GamesModel.getGame(data);
  if (game === null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game Not Found' } };
  }
  const completedData: Omit<Completed, 'id'> = {
    userId: validationToken.id, 
    gamesId: game.id,
  };

  const getCompleted : Completed | null = await CompletedModel.getCompleted(completedData);
  if (getCompleted !== null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game already Completed' } };
  }
  
  const completedResponse : Completed = await CompletedModel.create(completedData);

  return { status: StatusCode.OK, response: completedResponse };
};

export default {
  create,
};