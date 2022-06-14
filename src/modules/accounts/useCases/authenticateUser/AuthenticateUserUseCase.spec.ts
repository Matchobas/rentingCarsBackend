import ICreateUserDTO from '@modules/accounts/DTOs/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const userData: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'John Doe',
    };

    await createUserUseCase.execute(userData);

    const result = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with incorrect password', async () => {
    expect(async () => {
      const userData: ICreateUserDTO = {
        driver_license: '000123',
        email: 'user@test.com',
        password: '1234',
        name: 'John Doe',
      };

      await createUserUseCase.execute(userData);

      await authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: 'wrongPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
