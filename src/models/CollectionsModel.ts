import { Collections, Prisma, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Collections): Promise<Collections > => {
  const response = await Client.collections.create({
    data: {
      ...data,
    },
  });
  return response;
};

const find = async (data: Omit<Collections, 'categoriesId'>):
Promise<Collections[] | undefined> => {
  const response = await Client.collections.findMany({
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

const getAll = async (data: Omit<Collections, 'gamesId' | 'categoriesId'>, page: number):
Promise<Collections[] | undefined> => {
  const response = await Client.collections.findMany({
    skip: page,
    take: 20,
    where: {
      userId: {
        equals: data.userId,
      },
    },
    select: {
      userId: true,
      gamesId: true,
      categoriesId: true,
      games: true,
    },
  });
  return response;
};

const getAllByCategory = async (data: Omit<Collections, 'gamesId'>, page: number):
Promise<Collections[] | undefined> => {
  const response = await Client.collections.findMany({
    skip: page,
    take: 20,
    where: {
      userId: { equals: data.userId },
      categoriesId: { equals: data.categoriesId },
    },
    select: {
      userId: true,
      gamesId: true,
      categoriesId: true,
      games: true,
    },
  });
  return response;
};

const update = async (data: Collections): Promise<Prisma.BatchPayload> => {
  const response = await Client.collections.updateMany({
    where: {
      userId: {
        equals: data.userId,
      },
      gamesId: {
        equals: data.gamesId,
      },
    },
    data: {
      categoriesId: data.categoriesId,
    },
  });
  return response;
};

const deleteC = async (data: Omit<Collections, 'categoriesId'>):
Promise<Prisma.BatchPayload> => {
  const response = await Client.collections.deleteMany({
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
  find,
  getAll,
  getAllByCategory,
  update,
  deleteC,
};