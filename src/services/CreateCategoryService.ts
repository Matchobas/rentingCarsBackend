import Category from '../model/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute({ name, description }: IRequest): Category {
    const categoryExists = this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category name already created!');
    }

    const category = this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export default CreateCategoryService;
