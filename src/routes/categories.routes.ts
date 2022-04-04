import { Router, Request, Response } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const uploader = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

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
