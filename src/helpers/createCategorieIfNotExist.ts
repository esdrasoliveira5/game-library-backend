import { Categories } from '@prisma/client';
import CategoriesModel from '../models/CategoriesModel';

const createCategorie = async (data: Omit<Categories, 'id'>): Promise<Categories> => {
  let categories = await CategoriesModel.find(data);
  if (categories === undefined) {
    categories = await CategoriesModel.create(data);
  }
  return categories;
};

export default createCategorie;