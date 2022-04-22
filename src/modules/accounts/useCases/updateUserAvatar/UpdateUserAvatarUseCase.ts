import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async execute({ user_id, avatar_file }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    user.avatar = avatar_file;

    // Ao invés de criar um novo ele atualiza o existente
    await this.usersRepository.create(user);
  }
}

export default UpdateUserAvatarUseCase;
