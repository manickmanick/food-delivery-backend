import { Router } from "express";

import { AuthController } from "./auth.controller";

import { asyncHandler } from "../../middlewares/async-handler";

import { validate } from "../../middlewares/validate.middleware";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

const authController = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(
    authController.register.bind(authController)
  )
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(
    authController.login.bind(authController)
  )
);

// testing route
router.get(
  "/me",
  protect,
  asyncHandler(
    async (req, res) => {

      res.json({
        success: true,
        user: req.user,
      });

    }
  )
);

export default router;