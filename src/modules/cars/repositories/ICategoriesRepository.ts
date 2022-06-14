import ICreateCategoryDTO from '../DTOs/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  all(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
}

export default ICategoryRepository;
