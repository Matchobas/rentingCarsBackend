import ICreateCategoryDTO from '../../DTOs/ICreateCategoryDTO';
import Category from '../../infra/typeorm/entities/Category';
import ICategoryRepository from '../ICategoriesRepository';

class CategoriesRepositoriesInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async all(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }
}

export { CategoriesRepositoriesInMemory };
