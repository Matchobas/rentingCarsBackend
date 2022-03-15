import ICreateCategoryDTO from '../DTOs/ICreateCategoryDTO';
import Category from '../model/Category';

interface ICategoryRepository {
  findByName(name: string): Category;
  all(): Category[];
  create({ name, description }: ICreateCategoryDTO): Category;
}

export default ICategoryRepository;
