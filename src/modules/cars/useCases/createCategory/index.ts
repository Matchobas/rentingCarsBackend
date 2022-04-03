import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import CreateCategoryController from './CreateCategoryController';
import CreateCategoryUseCase from './CreateCategoryUseCase';

// A forma de exportação foi criada como função para impedir que esse arquivo carregue diretamente
// resultando em erro
export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  const createCategoryController = new CreateCategoryController(createCategoryUseCase);

  return createCategoryController;
};
