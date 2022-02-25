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

const login = async (data: Omit<User, 'id' | 'name' | 'lastName' | 'picture' | 'password'>): 
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
  login,
};
