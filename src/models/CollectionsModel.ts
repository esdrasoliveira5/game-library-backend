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

const deleteC = async (data: Collections):
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
  update,
  deleteC,
};