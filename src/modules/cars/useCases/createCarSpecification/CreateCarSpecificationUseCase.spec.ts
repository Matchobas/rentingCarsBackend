import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: ICarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  });

  it('should be able add a new specification to a car', async () => {
    const car_id = '1234';
    const specifications_id = ['5432'];

    await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });
  });
});
