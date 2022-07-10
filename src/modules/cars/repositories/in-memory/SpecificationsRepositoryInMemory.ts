import ICreateSpecificationDTO from '@modules/cars/DTOs/ICreateSpecificationDTO';
import Specification from '@modules/cars/infra/typeorm/entities/Specification';

import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specs = this.specifications.filter((specification) => {
      if (ids.some((id) => id === specification.id)) {
        return specification;
      }

      return null;
    });

    return specs;
  }
}

export { SpecificationsRepositoryInMemory };
