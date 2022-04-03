import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.all();

    return categories;
  }
}

export default ListCategoriesUseCase;
