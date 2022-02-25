import { User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import createValidation from '../helpers/createValidation';
import loginValidate from '../helpers/loginValidate';
import passwordCrypt from '../helpers/passwordCrypt';
import tokenGenerate from '../helpers/tokenGenerate';
import { ResponseError, ResponseToken } from '../interfaces/StatusResponse';
import UserModel from '../models/UserModel';

const create = async (data: Omit<User, 'id'>): Promise<ResponseToken | ResponseError> => {
  const { name, lastName, email, password, picture } = data;
  const validation = createValidation(data);
  if (validation) return validation;
  
  const hashedPassword = await passwordCrypt.hashIt(password);
  const { id } = await UserModel.create({
    name, lastName, email, password: hashedPassword, picture,
  });
  
  const token = tokenGenerate(id, email, password);
  return { status: StatusCode.CREATED, response: { token } };
};

const login = async (data: Omit<User, 'id' | 'name' | 'lastName' | 'picture'>):
Promise<ResponseToken | ResponseError> => {
  const { email, password } = data;
  const validation = loginValidate(email, password);
  if (validation) return validation;

  const result = await UserModel.login({ email });
  if (result === null) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Invalid email' } };
  }

  const hashedPassword = await passwordCrypt.compareIt(password, result.password);
  if (!hashedPassword) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid password' } };
  }

  const token = tokenGenerate(result.id, email, password);
  return { status: StatusCode.OK, response: { token } };
};

export default {
  create,
  login,
};
