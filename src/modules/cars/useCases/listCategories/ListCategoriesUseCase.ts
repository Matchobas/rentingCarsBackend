import { inject, injectable } from 'tsyringe';

import Category from '@modules/cars/infra/entities/Category';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.all();

    return categories;
  }
}

export default ListCategoriesUseCase;
