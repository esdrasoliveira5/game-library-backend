import { PrismaClient, User } from '@prisma/client';

const Client = new PrismaClient();

const create = async (data: Omit<User, 'id'>): Promise<User> => {
  const response = await Client.user.create({
    data: {
      ...data,
    },
  });
  return response;
};

export default {
  create,
};
