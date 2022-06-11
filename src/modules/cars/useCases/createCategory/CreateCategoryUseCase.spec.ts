import Category from '../../entities/Category';
import { CategoriesRepositoriesInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoriesInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoriesInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Matheus',
      description: 'Category description Test',
    });

    expect(category).toHaveProperty('name', 'Matheus');
    expect(category).toHaveProperty('description', 'Category description Test');
    expect(category).toBeInstanceOf(Category);
  });
});
