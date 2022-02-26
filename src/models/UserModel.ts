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

const getUser = async (data: Omit<User, 'id' | 'name' | 'lastName' | 'avatar' | 'password'>): 
Promise<User | null> => {
  const response = await Client.user.findUnique({
    where: {
      email: data.email,
    },
  });
  return response;
};

export default {
  create,
  getUser,
};
