import { Categories, Collections, Prisma, User } from '@prisma/client';
import { UserSelectInterface } from './UserInterface';

export interface StatusInterface {
  status: number,
}

export interface ResponseUser extends StatusInterface {
  response: User | UserSelectInterface
}

export interface ResponseError extends StatusInterface {
  response: {
    error: string,
  }
}

export interface ResponseToken extends StatusInterface {
  response: {
    token: string | undefined
  }
}

export interface ResponseCollections extends StatusInterface {
  response: Collections | Collections[]
}

export interface ResponseCategories extends StatusInterface {
  response: Categories[] | Categories
}

export interface ResponseUpdateDelete extends StatusInterface {
  response: Prisma.BatchPayload
}

export interface ResponseNoContent extends StatusInterface {
  response: undefined,
}