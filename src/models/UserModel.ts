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

const updateUser = async (data: Omit<User, 'email'>): Promise<User> => {
  const response = await Client.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });
  return response;
};

const deleteUser = async (id: string) => {
  await Client.collections.deleteMany({
    where: {
      userId: { equals: id },
    },
  });

  await Client.categories.deleteMany({
    where: {
      userId: { equals: id },
    },
  });

  await Client.user.delete({
    where: {
      id,
    },
  });
};

export default {
  create,
  getUser,
  updateUser,
  deleteUser,
};
