import { Games, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<Games, 'id'>): Promise<Games> => {
  const response = await Client.games.create({
    data: {
      ...data,
    },
  });
  return response;
};

const getGame = async (data: Omit<Games, 'id' | 'name' | 'image'>):
Promise<Games | null> => {
  const response = await Client.games.findUnique({
    where: {
      idGame: data.idGame,
    },
  });
  return response;
};

export default {
  create,
  getGame,
};
