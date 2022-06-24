import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  create(data: ICreateCarDTO): Promise<void> {}
}

export { CarsRepositoryInMemory };
