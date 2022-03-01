import { Favorites, Games, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import gameExist from '../helpers/gameExist';
import gameFavorited from '../helpers/gameFavorited';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import FavoritesModel from '../models/FavoritesModel';
import GamesModel from '../models/GamesModel';

const ERR_FAVORITED = { error: 'Game already in Favorited list' };

const create = async (token: string | undefined, data: Omit<Games, 'id'>):
Promise<ResponseFavorites | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  
  let game: Games | null = await GamesModel.getGame(data);
  if (game === null) {
    game = await GamesModel.create(data);
  }
  const favoritesData: Omit<Favorites, 'id'> = {
    userId: validationToken.id, 
    gamesId: game.id,
  };

  const gameFav = await gameFavorited(favoritesData);
  
  if (gameFav !== undefined) return { status: StatusCode.BAD_REQUEST, response: ERR_FAVORITED };

  const favoriteResponse : Favorites = await FavoritesModel.create(favoritesData);
  return { status: StatusCode.CREATED, response: favoriteResponse };
};

const getOne = async (token: string | undefined, data: Omit<Games, 'id' | 'image' | 'name'>):
Promise<ResponseError | ResponseFavorites> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  const game: ResponseError | Games = await gameExist(data);
  if ('status' in validationToken) return validationToken;
  if ('status' in game) return game;

  const favoritesData: Omit<Favorites, 'id'> = {
    userId: validationToken.id, 
    gamesId: game.id,
  };
  const favorited = await gameFavorited(favoritesData);
  
  if ('status' in favorited) return favorited;
  return { status: StatusCode.OK, response: favorited };
};

export default {
  create,
  getOne,
};