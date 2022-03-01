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

const getOne = async (data: Omit<Favorites, 'id'>):
Promise<Favorites[] | undefined> => {
  const response = await Client.favorites.findMany({
    where: {
      userId: {
        equals: data.userId,
      },
      gamesId: {
        equals: data.gamesId,
      },
    },
  });
  return response;
};

export default {
  create,
  getOne,
};