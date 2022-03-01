import { Collections } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';
import CollectionsModel from '../models/CollectionsModel';

const collectionExists = async (data: Omit<Collections, 'categoriesId'>):
Promise<Collections | ResponseError> => {
  const collection: Collections[] | undefined = await CollectionsModel.find(data);
  
  if (collection === undefined || collection[0] === undefined) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game not in Collection' } };
  }
  return collection[0];
};

export default collectionExists;