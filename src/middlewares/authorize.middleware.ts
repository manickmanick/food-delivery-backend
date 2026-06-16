import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth-request";
import { AppError } from "../utils/app-error";

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    console.log();
    if (!roles.includes(req.user.role)) {
      console.log("roles different");

      throw new AppError("Forbidden", 403);
    }

    next();
  };
