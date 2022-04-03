import ICreateSpecificationDTO from '../DTOs/ICreateSpecificationDTO';
import Specification from '../entities/Specification';

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export default ISpecificationsRepository;
