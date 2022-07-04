import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCarsUseCase } from './ListCarsUseCase';

class ListCarsController {
  async handle(request: Request, response: Response) {
    const { category_id, name, brand } = request.query;

    const listCarsUseCase = container.resolve(ListCarsUseCase);
    const cars = listCarsUseCase.execute({});

    return response.json(cars);
  }
}

export { ListCarsController };
