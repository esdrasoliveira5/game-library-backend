import { User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import initialCategories from '../helpers/createInitialCategories';
import createValidation from '../helpers/createValidation';
import loginValidate from '../helpers/loginValidate';
import passwordCrypt from '../helpers/passwordCrypt';
import tokenGenerate from '../helpers/tokenGenerate';
import tokenValidation from '../helpers/tokenValidation';
import {
  ResponseError,
  ResponseNoContent,
  ResponseToken,
  ResponseUser,
} from '../interfaces/StatusResponse';
import UserModel from '../models/UserModel';

const create = async (data: Omit<User, 'id'>): Promise<ResponseToken | ResponseError> => {
  const { name, lastName, email, password, avatar } = data;
  const validation: ResponseError | void = createValidation(data);
  if (validation) return validation;
  
  const hashedPassword: string = await passwordCrypt.hashIt(password);
  const user: User = await UserModel.create({
    name, lastName, email, password: hashedPassword, avatar,
  });
  const findData = { name: 'Sem categoria', userId: user.id };
  await initialCategories(findData);

  const token: string = tokenGenerate(user.id, email);
  return { status: StatusCode.CREATED, response: { token } };
};

const login = async (data: Omit<User, 'id' | 'name' | 'lastName' | 'avatar'>):
Promise<ResponseToken | ResponseError> => {
  const { email, password } = data;
  const validation: ResponseError | void = loginValidate(email, password);
  if (validation) return validation;

  const result: User | null = await UserModel.getUser({ email });
  if (result === null) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Invalid email' } };
  }

  const hashedPassword: boolean = await passwordCrypt.compareIt(password, result.password);
  if (!hashedPassword) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid password' } };
  }

  const token: string = tokenGenerate(result.id, email);
  return { status: StatusCode.OK, response: { token } };
};

const getUser = async (token: string | undefined):
Promise<ResponseUser | ResponseError> => {
  const validationToken: ResponseError | User = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  const user = {
    name: validationToken.name,
    lastName: validationToken.lastName,
    email: validationToken.email,
    avatar: validationToken.avatar,
  };

  return { status: StatusCode.OK, response: user };
};

const updateUser = async (token: string | undefined, data: Omit<User, 'id' | 'email'>):
Promise<ResponseUser | ResponseError> => {
  const { name, lastName, password, avatar } = data;

  const validationToken: ResponseError | User = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  
  const hashedPassword: string = await passwordCrypt.hashIt(password);
  const user = await UserModel.updateUser({
    id: validationToken.id, name, lastName, password: hashedPassword, avatar,
  });

  return { status: StatusCode.OK, response: user };
};

const deleteUser = async (token: string | undefined):
Promise<ResponseNoContent | ResponseError> => {
  const validationToken: ResponseError | User = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  
  await UserModel.deleteUser(validationToken.id);

  return { status: StatusCode.NO_CONTENT, response: undefined };
};

export default {
  create,
  login,
  getUser,
  updateUser,
  deleteUser,
};
