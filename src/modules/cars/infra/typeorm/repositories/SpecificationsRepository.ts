/* eslint-disable no-use-before-define */
import { getRepository, Repository } from 'typeorm';

import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';

import ICreateSpecificationDTO from '../../DTOs/ICreateSpecificationDTO';
import Specification from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: { name },
    });

    return specification;
  }
}

export default SpecificationsRepository;
