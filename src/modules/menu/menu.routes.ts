import { Router } from "express";

import { MenuController } from "./menu.controller";

import { protect } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../../constants/role";

import { asyncHandler } from "../../middlewares/async-handler";

import { validate } from "../../middlewares/validate.middleware";

import { createMenuItemSchema, updateMenuItemSchema } from "./menu.validation";

const router = Router();

const menuController = new MenuController();

router.post(
  "/",
  protect,
  authorize(Role.RESTAURANT_OWNER),
  validate(createMenuItemSchema),
  asyncHandler(menuController.createMenuItem.bind(menuController)),
);

router.get("/", asyncHandler(menuController.getMenuItems.bind(menuController)));

router.get(
  "/:id",
  asyncHandler(menuController.getMenuItem.bind(menuController)),
);

router.put(
  "/:id",
  protect,
  authorize(Role.RESTAURANT_OWNER),
  validate(updateMenuItemSchema),
  asyncHandler(menuController.updateMenuItem.bind(menuController)),
);

router.delete(
  "/:id",
  protect,
  authorize(Role.RESTAURANT_OWNER),
  asyncHandler(menuController.deleteMenuItem.bind(menuController)),
);

router.get(
  "/restaurant/:restaurantId",
  asyncHandler(menuController.getRestaurantMenu.bind(menuController)),
);

export default router;
