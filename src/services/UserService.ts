import { User } from '@prisma/client';
import Joi from 'joi';
import StatusCode from '../enum/StatusCode';
import tokenGenerate from '../helpers/tokenGenerate';
import { ResponseError, ResponseToken } from '../interfaces/StatusResponse';
import UserModel from '../models/UserModel';

const create = async (data: Omit<User, 'id'>): Promise<ResponseToken | ResponseError> => {
  const { name, lastName, email, password, picture } = data;
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    lastName: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().min(8).max(12).required(),
    picture: Joi.string().not().empty().required(),
  }).validate({ name, lastName, email, password, picture });

  if (error) {
    return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
  }
  const token = tokenGenerate(email, password);

  await UserModel.create(data);

  return { status: StatusCode.CREATED, response: { token } };
};

const login = async (data: Omit<User, 'id' | 'name' | 'lastName' | 'picture'>):
Promise<ResponseToken | ResponseError> => {
  const { email, password } = data;
  const { error } = Joi.object({
    email: Joi.string().not().empty().required(),
    password: Joi.string().min(8).max(12).required(),
  }).validate({ email, password });
  if (error) {
    return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
  }

  const result = await UserModel.login({ email });
  if (result === null) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Invalid email' } };
  }
  if (result.password !== password) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid password' } };
  }
  
  const token = tokenGenerate(email, password);
  return { status: StatusCode.OK, response: { token } };
};

export default {
  create,
  login,
};
