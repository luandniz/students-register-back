import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { z } from "zod";

export const handleErrors = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json(err.flatten().fieldErrors);
  }

  console.log(err);

  return res.status(500).json({ message: "Internal server error" });
};
