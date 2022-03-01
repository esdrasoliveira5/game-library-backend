import { Games, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data:Games): Promise<Games> => {
  const response = await Client.games.create({
    data: {
      ...data,
    },
  });
  return response;
};

const getGame = async (data: Omit<Games, 'image' | 'name'>):
Promise<Games | null> => {
  const response = await Client.games.findUnique({
    where: {
      id: data.id,
    },
  });
  return response;
};

export interface GameUser {
  idGame: number,
  userId: string,
}
export default {
  create,
  getGame,
};
