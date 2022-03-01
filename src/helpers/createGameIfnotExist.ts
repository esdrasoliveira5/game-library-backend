import { Games } from '@prisma/client';
import GamesModel from '../models/GamesModel';

const createGame = async (data: Games): Promise<Games> => {
  let game: Games | null = await GamesModel.getGame(data);
  if (game === null) {
    game = await GamesModel.create(data);
  }
  return game;
};
export default createGame;