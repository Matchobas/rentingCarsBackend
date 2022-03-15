import { Router, Request, Response } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoriesController } from '../modules/cars/useCases/importCategories';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const uploader = multer({
  dest: './temp',
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
  '/upload',
  uploader.single('file'),
  (request: Request, response: Response) => {
    return importCategoriesController.handle(request, response);
  }
);

export { categoriesRoutes };
