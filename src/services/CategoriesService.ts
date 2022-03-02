import { Categories, User } from '@prisma/client';
import StatusCode from '../enum/StatusCode';
import createCategorie from '../helpers/createCategorieIfNotExist';
import tokenValidation from '../helpers/tokenValidation';
import verifyCategory from '../helpers/verifyCategory';
import {
  ResponseCategories,
  ResponseError,
} from '../interfaces/StatusResponse';
import CategoriesModel from '../models/CategoriesModel';

const create = async (token: string | undefined, data: Omit<Categories, 'id' | 'userId'>):
Promise<ResponseError | ResponseCategories> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;

  const categorie = await createCategorie({ name: data.name, userId: validationToken.id });
  return { status: StatusCode.CREATED, response: categorie };
};

const getAll = async (token: string | undefined): Promise<ResponseError | ResponseCategories> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  const categories:
  Categories[] | undefined = await CategoriesModel.getAll({ userId: validationToken.id });
  if (categories === undefined || categories.length === 0) {
    return { status: StatusCode.NOT_FOUND, response: [] };
  }
  return { status: StatusCode.OK, response: categories };
};

const deleteC = async (token: string | undefined, data: Omit<Categories, 'name' | 'userId'>):
Promise<ResponseCategories | ResponseError> => {
  const validationToken: User | ResponseError = await tokenValidation(token);
  if ('status' in validationToken) return validationToken;
  const categoryV = await verifyCategory(data);
  if (categoryV !== true) return categoryV;
  
  const categorieData = { id: data.id };

  const category: Categories = await CategoriesModel.deleteC(categorieData);
  
  if (category.id) {
    return { status: StatusCode.NOT_FOUND, response: { error: 'Category not found' } };
  }
  return { status: StatusCode.OK, response: category };
};

export default {
  create,
  getAll,
  deleteC,
};
