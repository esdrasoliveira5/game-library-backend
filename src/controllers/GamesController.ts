import { Request, Response } from 'express';
import GamesModel, { GameUser } from '../models/GamesModel';

const getUserGame = async (req: Request, resp: Response) => {
  const { idGame, userId } = req.body as Omit<GameUser, 'id'>;

  const response = await GamesModel.getUserGame({ idGame, userId });
  console.log(response);
  return resp.status(200).json(response);
};

export default {
  getUserGame,
};