import { User } from '@prisma/client';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';
import UserModel from '../models/UserModel';

dotenv.config();

const secret = process.env.JWT_SECRET as string;
export interface TokenInterface {
  data: {
    id: string;
    email: string;
  };
}

const tokenValidation = async (token: string | undefined):
Promise< ResponseError | User > => {
  if (token === undefined) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Token not found' } };
  }
  try {
    const decoded = jwt.verify(token, secret) as TokenInterface;
    const { data: { id, email } } = decoded;
   
    const user = await UserModel.getUser({ email });
    if (user === null || user.id !== id) {
      return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
    }
    return user;
  } catch (error) {
    return { status: StatusCode.UNAUTHORIZED, response: { error: 'Invalid token' } };
  }
};

export default tokenValidation;
