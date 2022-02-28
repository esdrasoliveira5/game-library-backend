import { Favorites, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<Favorites, 'id'>) : Promise<Favorites> => {
  const response = await Client.favorites.create({
    data: {
      ...data,
    },
  });
  return response;
};

const getFavorite = async (data: Omit<Favorites, 'id'>):
Promise<Favorites | null> => {
  const response = await Client.favorites.findFirst({
    where: {
      AND: [
        {
          userId: data.userId,
        },
        {
          gamesId: data.gamesId,
        },
      ],
    },
  });
  return response;
};

export default {
  create,
  getFavorite,
};