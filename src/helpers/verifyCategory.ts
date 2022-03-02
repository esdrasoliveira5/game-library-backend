import { Categories } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import CategoriesModel from '../models/CategoriesModel';

const error = { error: 'Cannot delete category' };
// eslint-disable-next-line complexity
const verifyCategory = async (data: Omit<Categories, 'name' | 'userId'>) => {
  const findCategory = await CategoriesModel.findById(data);
  if (findCategory === null) {
    return true;
  }
  if (findCategory.name === 'Sem Categoria') {
    return { status: StatusCode.UNAUTHORIZED, response: error }; 
  }
  if (findCategory.name === 'Jogando') {
    return { status: StatusCode.UNAUTHORIZED, response: error };
  }
  if (findCategory.name === 'Completo') {
    return { status: StatusCode.UNAUTHORIZED, response: error };
  }
  if (findCategory.name === 'Completo') {
    return { status: StatusCode.UNAUTHORIZED, response: error };
  }
  return true;
};

export default verifyCategory;