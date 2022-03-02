import { Categories } from '@prisma/client';
import CategoriesModel from '../models/CategoriesModel';

const initialCategories = async (data: Omit<Categories, 'id'>): Promise<Categories | void> => {
  const findCategory = await CategoriesModel.find(data);
  if (findCategory === undefined) {
    await CategoriesModel.createMany({ userId: data.userId });
    const newfindCategory = await CategoriesModel.find(data);
    if (newfindCategory !== undefined) return newfindCategory;
  }
  return findCategory;
};

export default initialCategories;