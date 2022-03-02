import { Collections, Games } from '@prisma/client';

export interface CollectionsInterface extends Collections{
  game: Games,
}