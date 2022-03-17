import { parse } from 'csv-parse';
import fs from 'fs';

import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

interface IImportCategorie {
  name: string;
  description: string;
}

class ImportCategoriesUseCase {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  private loadCategories(file: Express.Multer.File): Promise<IImportCategorie[]> {
    return new Promise((resolve, reject) => {
      const steam = fs.createReadStream(file.path);
      const categories: IImportCategorie[] = [];

      const parseFile = parse({
        delimiter: ';',
      });

      steam.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const categoryExists = this.categoriesRepository.findByName(category.name);

      if (!categoryExists) {
        this.categoriesRepository.create({
          name: category.name,
          description: category.description,
        });
      }
    });
  }
}

export default ImportCategoriesUseCase;
