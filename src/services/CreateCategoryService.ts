import Category from '../model/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
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
