import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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
      brand: 'Car_brand_test',
      category_id: '12345678',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car things',
      daily_rate: 1000,
      license_plate: 'AAA-1111',
      fine_amount: 2000,
      brand: 'Car_brand_test',
      category_id: '12345',
    });

    const cars = await listCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'MegaCar',
      description: 'Car things',
      daily_rate: 1000,
      license_plate: 'AAA-1111',
      fine_amount: 2000,
      brand: 'Car_brand_test',
      category_id: '12345678',
    });

    const cars = await listCarsUseCase.execute({
      name: 'MegaCar',
    });

    expect(cars).toEqual([car]);
  });

  // it('should not be able to list unavailable cars', async () => {
  //   const car = await carsRepositoryInMemory.create({
  //     name: 'Car1',
  //     description: 'Car things',
  //     daily_rate: 1000,
  //     license_plate: 'AAA-1111',
  //     fine_amount: 2000,
  //     brand: 'Car_brand_test',
  //     category_id: '12345678',
  //   });

  //   const cars = await listCarsUseCase.execute({
  //     brand: 'Car_brand_test',
  //   });

  //   expect(cars).toEqual([car]);
  // });
});
