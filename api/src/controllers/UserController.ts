import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    // repository
    const userRepository = getRepository(User);

    // check email duplicate
    const userAlreadyExists = await userRepository.findOne({
      email,
    });
    if (userAlreadyExists) {
      return res.status(400).json({
        error: 'usuário já cadastrado',
      });
    }
    // end email duplicate
    const user = userRepository.create({
      name,
      email,
    });
    await userRepository.save(user);
    return res.json(user);
  }
}

export { UserController };
