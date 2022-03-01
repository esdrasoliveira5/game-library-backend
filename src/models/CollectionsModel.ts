import { Collections, PrismaClient } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Collections): Promise<Collections > => {
  const response = await Client.collections.create({
    data: {
      ...data,
    },
  });
  return response;
};

const find = async (data: Collections): Promise<Collections[] | undefined> => {
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

export default {
  create,
  find,
};