import { User } from '@prisma/client';
import Joi from 'joi';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';

const createValidation = (data: Omit<User, 'id'>): ResponseError | void => {
  const { name, lastName, email, password, avatar } = data;
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    lastName: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    password: Joi.string().min(8).max(12).required(),
    avatar: Joi.string().not().empty().required(),
  }).validate({ name, lastName, email, password, avatar });

  if (error) {
    return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
  }
};

export default createValidation;