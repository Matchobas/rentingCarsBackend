import Category from '../../model/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute(): Category[] {
    const categories = this.categoriesRepository.all();

    return categories;
  }
}

export default ListCategoriesUseCase;
