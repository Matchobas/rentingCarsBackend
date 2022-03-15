import SpecificationsRepository from '../repositories/implementations/SpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  private specificationsRepository: SpecificationsRepository;

  constructor(specificationsRep: SpecificationsRepository) {
    this.specificationsRepository = specificationsRep;
  }

  execute({ name, description }: IRequest): void {
    const specificationExists = this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationService;
