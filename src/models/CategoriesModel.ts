import { Categories, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<Categories, 'id'>): Promise<Categories> => {
  const response = await Client.categories.create({
    data: {
      ...data,
    },
  }); 
  return response;
};

const find = async (data: Omit<Categories, 'id'>): Promise<Categories | undefined> => {
  const response = await Client.categories.findMany({
    where: {
      userId: {
        equals: data.userId,
      },
      name: {
        equals: data.name,
      },
    },
  });
  return response[0];
};

const getAll = async (data: Omit<Categories, 'id' | 'name'>): Promise<Categories[] | undefined> => {
  const response = await Client.categories.findMany({
    where: {
      userId: data.userId,
    },
  });
  return response;
};

export default {
  create,
  find,
  getAll,
};
