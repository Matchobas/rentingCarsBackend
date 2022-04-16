import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }

    const token = sign({}, 'b994c1110d0c47f534b6ec6ddcff004b', {
      subject: user.id,
      expiresIn: '1d',
    });

    const responseToken: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return responseToken;
  }
}

export default AuthenticateUserUseCase;
