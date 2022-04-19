import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new Error('Missing authorization token');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: user_id } = verify(token, 'b994c1110d0c47f534b6ec6ddcff004b') as IPayload;
    const repository = new UsersRepository();
    const user = await repository.findById(user_id);

    if (!user) {
      throw new Error('User does not exist');
    }

    next();
  } catch {
    throw new Error('Invalid token');
  }
}
