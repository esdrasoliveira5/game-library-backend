import { Completed, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<Completed, 'id'>) => {
  const response = await Client.completed.create({
    data: {
      ...data,
    },
  });
  return response;
};

const getCompleted = async (data: Omit<Completed, 'id'>):
Promise<Completed | null> => {
  const response = await Client.completed.findFirst({
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
  getCompleted,
};