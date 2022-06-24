import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemoery: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemoery = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemoery);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Ferrari Enzo',
      description: 'Red and really fast car',
      daily_rate: 1500,
      license_plate: 'AAA-6668',
      fine_amount: 6000,
      brand: 'Ferrari',
      category_id: '12345678',
    });
  });
});