import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/app-error";
import { AuthRequest } from "../types/auth-request";

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
      role: string;
    };

    console.log("decoded -> ", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError("Token expired", 401));
    }

    return next(new AppError("Invalid token", 401));
  }
};
