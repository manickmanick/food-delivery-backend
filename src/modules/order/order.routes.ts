import { Router } from "express";

import { OrderController } from "./order.controller";

import { protect } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/authorize.middleware";

import { asyncHandler } from "../../middlewares/async-handler";

import { validate } from "../../middlewares/validate.middleware";

import { updateOrderStatusSchema } from "./order.validation";

import { Role } from "../../constants/role";

const router = Router();

const orderController = new OrderController();

router.post(
  "/",
  protect,
  asyncHandler(orderController.placeOrder.bind(orderController)),
);

router.get(
  "/",
  protect,
  asyncHandler(orderController.getMyOrders.bind(orderController)),
);

router.get(
  "/:id",
  protect,
  asyncHandler(orderController.getOrderById.bind(orderController)),
);

router.patch(
  "/:id/accept",
  protect,
  authorize(Role.RESTAURANT_OWNER),
  asyncHandler(orderController.acceptOrder.bind(orderController)),
);

router.patch(
  "/:id/status",
  protect,
  authorize(Role.RESTAURANT_OWNER),
  validate(updateOrderStatusSchema),
  asyncHandler(orderController.updateOrderStatus.bind(orderController)),
);

export default router;
