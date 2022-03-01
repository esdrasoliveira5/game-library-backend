import { Categories, Prisma, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<Categories, 'id'>): Promise<Categories> => {
  const response = await Client.categories.create({
    data: {
      ...data,
    },
  }); 
  return response;
};

const createMany = async (data: Omit<Categories, 'id' | 'name'>) => {
  const response = await Client.categories.createMany({
    data: [
      { name: 'Sem Categoria', userId: data.userId },
      { name: 'Jogando', userId: data.userId },
      { name: 'Completei', userId: data.userId },
      { name: 'Não joguei', userId: data.userId },
    ],
    skipDuplicates: true, 
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

const deleteC = async (data: Omit<Categories, 'id' >): Promise<Prisma.BatchPayload> => {
  const response = await Client.categories.deleteMany({
    where: {
      name: {
        equals: data.name,
      },
      userId: {
        equals: data.userId,
      },
    },
  });
  return response;
};

export default {
  create,
  createMany,
  find,
  getAll,
  deleteC,
};
