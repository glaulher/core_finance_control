import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../models/Category';

class CategoryController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(req: Request, res: Response) {
    const { category } = req.body;
    // repository
    const CategoryRepository = getRepository(Category);

    // check email duplicate
    const CategoryAlreadyExists = await CategoryRepository.findOne({
      category,
    });
    if (CategoryAlreadyExists) {
      return res.status(400).json({
        error: 'Categoria já cadastrada',
      });
    }
    // end email duplicate
    const categories = CategoryRepository.create({
      category,
    });
    await CategoryRepository.save(categories);
    return res.json(categories);
  }
}

export { CategoryController };
