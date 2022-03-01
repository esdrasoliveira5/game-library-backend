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

const find = async (data: Omit<Categories, 'id'>): Promise<Categories | null> => {
  const response = await Client.categories.findUnique({
    where: {
      name: data.name,
    },
  });
  return response;
};

export default {
  create,
  find,
};
