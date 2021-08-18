import { getRepository } from 'typeorm';
import { Category } from '../models/Category';

interface RequestDTO {
  category: string;
}
class CategoryController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create({ category }: RequestDTO): Promise<Category> {
    // repository
    const CategoryRepository = getRepository(Category);

    // check email duplicate
    const CategoryAlreadyExists = await CategoryRepository.findOne({
      category,
    });
    if (CategoryAlreadyExists) {
      throw new Error('This category is already registered.');
    }
    // end email duplicate
    const categories = CategoryRepository.create({
      category,
    });
    await CategoryRepository.save(categories);
    return categories;
  }
}

export { CategoryController };
