import { Favorites, Games, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseFavorites } from '../interfaces/StatusResponse';
import FavoritesModel from '../models/FavoritesModel';
import GamesModel from '../models/GamesModel';

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

  const getFavorite : Favorites | null = await FavoritesModel.getFavorite(favoritesData);
  
  if (getFavorite !== null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game already Favorited' } };
  }
  const favoriteResponse : Favorites = await FavoritesModel.create(favoritesData);
  return { status: StatusCode.OK, response: favoriteResponse };
};

export default {
  create,
};