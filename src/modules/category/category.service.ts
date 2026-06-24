import { CategoryRepository } from "../../repositories/category.repository";

import { AppError } from "../../utils/app-error";

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async getCategories() {
    return this.categoryRepository.findAll();
  }

  async getCategory(id: number) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  }
}
