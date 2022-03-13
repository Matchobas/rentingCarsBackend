import { Router, Request, Response } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createCategorieService = new CreateCategoryService(categoriesRepository);

  const newCategory = createCategorieService.execute({
    name,
    description,
  });

  return response.status(201).send(newCategory);
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return response.json(categoriesRepository.all());
});

export { categoriesRoutes };
