import { getRepository, Repository } from 'typeorm';

import ICreateCategoryDTO from '../../DTOs/ICreateCategoryDTO';
import ICategoryRepository from '../../repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  // // eslint-disable-next-line no-use-before-define
  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!this.INSTANCE) {
  //     this.INSTANCE = new CategoriesRepository();
  //   }

  //   return this.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);

    return category;
  }

  async all(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export default CategoriesRepository;
