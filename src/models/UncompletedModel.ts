import { PrismaClient, Uncompleted } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<Uncompleted, 'id'>) => {
  const response = await Client.uncompleted.create({
    data: {
      ...data,
    },
  });
  return response;
};

const getUncompleted = async (data: Omit<Uncompleted, 'id'>):
Promise<Uncompleted | null> => {
  const response = await Client.uncompleted.findFirst({
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
  getUncompleted,
};