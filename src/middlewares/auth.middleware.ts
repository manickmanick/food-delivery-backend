import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/app-error";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader =
    req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    throw new AppError(
      "Authentication required",
      401
    );
  }

  const token =
    authHeader.split(" ")[1];

  const decoded =
    jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: number;
      email: string;
      role: string;
    };

  req.user = decoded;

  next();
};