import { Router, Request, Response } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const uploader = multer({
  dest: './temp',
});

categoriesRoutes.post('/', async (request: Request, response: Response) => {
  const category = await createCategoryController().handle(request, response);

  return category;
});

categoriesRoutes.get('/', async (request: Request, response: Response) => {
  const categories = await listCategoriesController().handle(request, response);

  return categories;
});

categoriesRoutes.post(
  '/upload',
  uploader.single('file'),
  async (request: Request, response: Response) => {
    const res = await importCategoriesController().handle(request, response);

    return res;
  }
);

export { categoriesRoutes };
