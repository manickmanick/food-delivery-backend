import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error middleware reached:", err.message);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
