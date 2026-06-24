import { Request, Response } from "express";

import { CategoryService } from "./category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    const categories = await categoryService.getCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  }

  async getCategory(req: Request, res: Response) {
    const category = await categoryService.getCategory(Number(req.params.id));

    return res.status(200).json({
      success: true,
      data: category,
    });
  }
}
