import { Request, Response } from 'express';

import ListCategoriesUseCase from './ListCategoriesUseCase';

class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  handle(request: Request, response: Response) {
    return response.json(this.listCategoriesUseCase.execute());
  }
}

export default ListCategoriesController;
