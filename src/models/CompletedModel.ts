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

const getOne = async (data: Omit<Completed, 'id'>):
Promise<Completed[] | null> => {
  const response = await Client.completed.findMany({
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