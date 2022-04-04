import { inject, injectable } from 'tsyringe';

import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category name already created!');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export default CreateCategoryUseCase;
