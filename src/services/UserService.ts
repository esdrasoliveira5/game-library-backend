import { User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import createValidation from '../helpers/createValidation';
import loginValidate from '../helpers/loginValidate';
import passwordCrypt from '../helpers/passwordCrypt';
import tokenGenerate from '../helpers/tokenGenerate';
import tokenValidation from '../helpers/tokenValidation';
import { ResponseError, ResponseToken, ResponseUser } from '../interfaces/StatusResponse';
import UserModel from '../models/UserModel';

const create = async (data: Omit<User, 'id'>): Promise<ResponseToken | ResponseError> => {
  const { name, lastName, email, password, avatar } = data;
  const validation: ResponseError | void = createValidation(data);
  if (validation) return validation;
  
  const hashedPassword: string = await passwordCrypt.hashIt(password);
  const { id }: User = await UserModel.create({
    name, lastName, email, password: hashedPassword, avatar,
  });
  
  const token: string = tokenGenerate(id, email);
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

  return { status: StatusCode.OK, response: validationToken };
};

export default {
  create,
  login,
  getUser,
};
