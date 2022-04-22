import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoriesController from '../modules/cars/useCases/importCategories/ImportCategoriesController';
import ListCategoriesController from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const uploader = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/upload', uploader.single('file'), importCategoriesController.handle);

export { categoriesRoutes };
