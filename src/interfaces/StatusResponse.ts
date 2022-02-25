import { User } from '@prisma/client';

export interface StatusInterface {
  status: number,
}

export interface ResponseUser extends StatusInterface {
  response: User
}