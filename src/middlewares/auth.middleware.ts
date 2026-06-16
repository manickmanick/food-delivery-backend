import { Request, Response, NextFunction } from "express";
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
    throw new AppError("Authentication required", 401);
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: number;
    email: string;
    role: string;
  };

  console.log("decoded -> ",decoded)
  req.user = decoded;

  next();
};
