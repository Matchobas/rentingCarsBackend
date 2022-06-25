import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Ferrari Enzo',
      description: 'Red and really fast car',
      daily_rate: 1500,
      license_plate: 'AAA-6668',
      fine_amount: 6000,
      brand: 'Ferrari',
      category_id: '12345678',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Ferrari Enzo',
        description: 'Red and really fast car',
        daily_rate: 1500,
        license_plate: 'AAA-6668',
        fine_amount: 6000,
        brand: 'Ferrari',
        category_id: '12345678',
      });

      await createCarUseCase.execute({
        name: 'Ferrari Enzo',
        description: 'Red and really fast car',
        daily_rate: 1500,
        license_plate: 'AAA-6668',
        fine_amount: 6000,
        brand: 'Ferrari',
        category_id: '12345678',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with availability true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Ferrari Enzo',
      description: 'Red and really fast car',
      daily_rate: 1500,
      license_plate: 'AAA-6668',
      fine_amount: 6000,
      brand: 'Ferrari',
      category_id: '12345678',
    });

    expect(car.available).toBe(true);
  });
});
