import { Router } from "express";

import { RestaurantController } from "./restaurant.controller";

import { protect } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { Role } from "../../constants/role";

import { validate } from "../../middlewares/validate.middleware";

import { createRestaurantSchema } from "./restaurant.validation";

import { asyncHandler } from "../../middlewares/async-handler";

const router = Router();

const restaurantController = new RestaurantController();

router.post(
  "/",
  protect,
  authorize(Role.ADMIN, Role.RESTAURANT_OWNER),
  validate(createRestaurantSchema),
  asyncHandler(
    restaurantController.createRestaurant.bind(restaurantController),
  ),
);

router.get(
  "/",
  asyncHandler(restaurantController.getRestaurants.bind(restaurantController)),
);

router.get(
  "/:id",
  asyncHandler(restaurantController.getRestaurant.bind(restaurantController)),
);

export default router;
