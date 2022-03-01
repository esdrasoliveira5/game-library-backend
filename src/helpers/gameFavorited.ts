import { Favorites } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';
import FavoritesModel from '../models/FavoritesModel';

const gameFavorited = async (data: Omit<Favorites, 'id'>): Promise<ResponseError | Favorites> => {
  const getFavorite : Favorites[] | undefined = await FavoritesModel.getOne(data);
  
  if (getFavorite === undefined) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game not in Favorited list' } };
  }
  return getFavorite[0];
};

export default gameFavorited;