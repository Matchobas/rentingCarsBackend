import { AppError } from '../../../../errors/AppError';
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
    expect(category).toHaveProperty('id');
    expect(category).toBeInstanceOf(Category);
  });

  it('should not be able to create a new category with a name that already exists', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'Matheus',
        description: 'Category description Test',
      });

      await createCategoryUseCase.execute({
        name: 'Matheus',
        description: 'Category description Test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
