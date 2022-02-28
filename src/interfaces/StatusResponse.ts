import { Favorites, User } from '@prisma/client';

export interface StatusInterface {
  status: number,
}

export interface ResponseUser extends StatusInterface {
  response: User
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

export interface ResponseFavorites extends StatusInterface {
  response: Favorites
}