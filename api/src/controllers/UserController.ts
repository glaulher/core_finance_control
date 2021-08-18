import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

interface RequestDTO {
  user_name: string;
  email: string;
}
class UserController {
  async create({ user_name, email }: RequestDTO): Promise<RequestDTO> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error('This e-mail is already registered.');
    }

    const user = usersRepository.create({
      user_name,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { UserController };
