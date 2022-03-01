import { Games } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';
import GamesModel from '../models/GamesModel';

const gameExist = async (data: Omit<Games, 'image' | 'name'>):
Promise<ResponseError | Games> => {
  const game: Games | null = await GamesModel.getGame(data);
  if (game === null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game Not Found' } };
  }
  return game;
};
export default gameExist;