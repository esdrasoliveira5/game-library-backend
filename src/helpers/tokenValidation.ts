import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';
import StatusCode from '../enums/StatusCode';
import { ResponseInterfaceError } from '../Interface/ResponseInterface';
import { User } from '../Interface/UserInterface';
import models from '../models/models';

dotenv.config();

const secret = process.env.JWT_SECRET as string;
export interface TokenInterface {
  data: {
    username: string;
    password: string;
  };
}

const tokenValidation = async (token: string | undefined):
Promise< ResponseInterfaceError | User > => {
  if (token === undefined) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Token not found' } };
  }
  try {
    const decoded = jwt.verify(token, secret) as TokenInterface;
    const { data: { username, password } } = decoded;
   
    const user = await models.getByName({ username, password });
    if (user.length === 0) {
      return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
    }
    return user[0];
  } catch (error) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
  }
};

export default tokenValidation;
