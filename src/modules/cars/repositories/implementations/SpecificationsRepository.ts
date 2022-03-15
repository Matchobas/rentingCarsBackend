/* eslint-disable no-use-before-define */
import ICreateSpecificationDTO from '../../DTOs/ICreateSpecificationDTO';
import Specification from '../../model/Specification';
import ISpecificationsRepository from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository();
    }

    return this.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export default SpecificationsRepository;
