import { Completed } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import { ResponseError } from '../interfaces/StatusResponse';
import CompletedModel from '../models/CompletedModel';

const gameCompleted = async (data: Omit<Completed, 'id'>): Promise< Completed | ResponseError> => {
  const getCompleted : Completed[] | null = await CompletedModel.getOne(data);
  if (getCompleted === null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game not in Completed list' } };
  }
  return getCompleted[0];
};

export default gameCompleted;