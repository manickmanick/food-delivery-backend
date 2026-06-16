import { Router } from "express";

import { CartController } from "./cart.controller";

import { protect } from "../../middlewares/auth.middleware";

import { asyncHandler } from "../../middlewares/async-handler";

import { validate } from "../../middlewares/validate.middleware";

import { addToCartSchema, updateQuantitySchema } from "./cart.validation";

const router = Router();

const cartController = new CartController();

router.post(
  "/items",
  protect,
  validate(addToCartSchema),
  asyncHandler(cartController.addToCart.bind(cartController)),
);

router.get(
  "/",
  protect,
  asyncHandler(cartController.getCart.bind(cartController)),
);

router.patch(
  "/items/:id",
  protect,
  validate(updateQuantitySchema),
  asyncHandler(cartController.updateQuantity.bind(cartController)),
);

router.delete(
  "/items/:id",
  protect,
  asyncHandler(cartController.removeItem.bind(cartController)),
);

router.delete(
  "/",
  protect,
  asyncHandler(cartController.clearCart.bind(cartController)),
);

export default router;
