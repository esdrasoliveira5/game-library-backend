import Joi from 'joi';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';

const loginValidate = (email: string, password: string): ResponseError | void => {
  const { error } = Joi.object({
    email: Joi.string().not().empty().required(),
    password: Joi.string().min(8).max(12).required(),
  }).validate({ email, password });
  if (error) {
    return { status: StatusCode.BAD_REQUEST, response: { error: error.details[0].message } };
  }
};

export default loginValidate;