import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET as string;
const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

const tokenGenerate = (id: string, email: string): string => {
  const token: string = jwt.sign({ data: { id, email } }, secret, jwtConfig);
  return token;
};

export default tokenGenerate;
