import { Router, Request, Response } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
