import { NextFunction, Request, Response } from "express";
import Student from "../entities/Student.entity";
import { studentRepo } from "../repositories";
import AppError from "../errors/AppError.error";

export const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const foundStudent: Student | null = await studentRepo.findOneBy({
    id: Number(req.params.studentId),
  });

  if (!foundStudent) {
    throw new AppError("Student not found", 404);
  }

  res.locals = { ...res.locals, foundStudent };
  return next();
};
