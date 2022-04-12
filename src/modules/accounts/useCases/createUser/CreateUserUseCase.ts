import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../../DTOs/ICreateUserDTO';
import User from '../../entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    username,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    // Checar regras de negócio antes de criar

    const user = await this.usersRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });

    return user;
  }
}

export default CreateUserUseCase;
