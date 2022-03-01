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

const getOne = async (data: Omit<Uncompleted, 'id'>):
Promise<Uncompleted[] | undefined> => {
  const response = await Client.uncompleted.findMany({
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