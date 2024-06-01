import { Request, Response, NextFunction } from "express";
import { studentRepo } from "../repositories";
import AppError from "../errors/AppError.error";
import Student from "../entities/Student.entity";

export const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email = req.body.email;
  const method = req.method;

  if (!email) return next();

  if (method === "POST") {
    const emailInUse: Student | null = await studentRepo.findOneBy({
      email: email,
    });

    if (emailInUse) {
      throw new AppError("Email already in use", 409);
    }
  } else if (method === "PATCH") {
    const studentId = req.params.studentId;

    const foundStudent: Student | null = await studentRepo.findOneBy({
      id: Number(studentId),
    });

    if (!foundStudent) {
      throw new AppError("Student not found", 404);
    }

    if (foundStudent.email !== email) {
      const emailInUse: Student | null = await studentRepo.findOneBy({
        email: email,
      });

      if (emailInUse) {
        throw new AppError("Email already in use", 409);
      }
    }
  }

  next();
};
