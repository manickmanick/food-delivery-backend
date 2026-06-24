import { Router } from "express";

import { CategoryController } from "./category.controller";

import { asyncHandler } from "../../middlewares/async-handler";

const router = Router();

const categoryController = new CategoryController();

router.get(
  "/",
  asyncHandler(categoryController.getCategories.bind(categoryController)),
);

router.get(
  "/:id",
  asyncHandler(categoryController.getCategory.bind(categoryController)),
);

export default router;
