import { inject, injectable } from 'tsyringe';

import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  private specificationsRepository: SpecificationsRepository;

  constructor(
    @inject('SpecificationsRepository')
    specificationsRep: SpecificationsRepository
  ) {
    this.specificationsRepository = specificationsRep;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationExists = await this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new AppError('Specification already exists');
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationUseCase;
