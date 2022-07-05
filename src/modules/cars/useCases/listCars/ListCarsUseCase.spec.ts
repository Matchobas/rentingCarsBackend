import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car things',
      daily_rate: 1000,
      license_plate: 'AAA-1111',
      fine_amount: 2000,
      brand: 'Car',
      category_id: '12345678',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car things',
      daily_rate: 1000,
      license_plate: 'AAA-1111',
      fine_amount: 2000,
      brand: 'Car',
      category_id: '12345678',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car',
    });

    expect(cars).toEqual([car]);
  });
});
