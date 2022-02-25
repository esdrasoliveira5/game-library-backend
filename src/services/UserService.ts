import { User } from '@prisma/client';
import { ResponseUser } from '../interfaces/StatusResponse';
import UserModel from '../models/UserModel';

const create = async (data: Omit<User, 'id'>): Promise<ResponseUser> => {
  const result = await UserModel.create(data);
  return { status: 200, response: result };
};

export default {
  create,
};
