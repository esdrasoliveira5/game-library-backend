import { Uncompleted } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import UncompletedModel from '../models/UncompletedModel';

const gameUncompleted = async (data: Omit<Uncompleted, 'id'>) => {
  const getUncompleted: Uncompleted[] | null = await UncompletedModel.getOne(data);
  
  if (getUncompleted === null) {
    return { status: StatusCode.BAD_REQUEST, response: { error: 'Game not in Uncompleted list' } };
  }
  return getUncompleted[0];
};
export default gameUncompleted;