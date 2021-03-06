import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '@modules/accounts/DTOs/ICreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('This email already exist in the database');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });

    return user;
  }
}

export default CreateUserUseCase;
