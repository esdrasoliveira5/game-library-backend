/* eslint-disable max-lines-per-function */
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

const getGame = async (data: Omit<Games, 'id' | 'image' | 'name'>):
Promise<Games | null> => {
  const response = await Client.games.findUnique({
    where: {
      idGame: data.idGame,
    },
  });
  return response;
};

export interface GameUser {
  idGame: number,
  userId: string,
}

const getUserGame = async (data:GameUser) => {
  const response = await Client.games.findMany({
    where: {
      idGame: {
        equals: data.idGame,
      },
      uncompleted: {
        some: {
          userId: data.userId,
        },
      },
    },
    select: {
      favorites: true,
      uncompleted: true,
      completed: true,
    },
  });
  return response;
};

export default {
  create,
  getGame,
  getUserGame,
};
