import { parse } from 'csv-parse';
import fs from 'fs';

class ImportCategoriesUseCase {
  execute(file: Express.Multer.File) {
    const steam = fs.createReadStream(file.path);

    const parseFile = parse();

    steam.pipe(parseFile);

    parseFile.on('data', (line) => {
      console.log(line);
    });
  }
}

export default ImportCategoriesUseCase;
