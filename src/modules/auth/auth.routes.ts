import { Router } from "express";

import { AuthController } from "./auth.controller";

import { asyncHandler } from "../../middlewares/async-handler";

import { validate } from "../../middlewares/validate.middleware";

import { registerSchema, loginSchema } from "./auth.validation";
import { AuthRequest } from "../../types/auth-request";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register.bind(authController)),
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login.bind(authController)),
);

router.get(
  "/me",
  protect,
  asyncHandler(authController.me.bind(authController)),
);

export default router;
