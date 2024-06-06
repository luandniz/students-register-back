import { Request, Response, NextFunction } from "express";
import { studentRepo } from "../repositories";
import AppError from "../errors/AppError.error";
import Student from "../entities/Student.entity";

export const verifyCpfExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const cpf = req.body.cpf;
  const method = req.method;

  if (!cpf) return next();

  if (method === "POST") {
   
    const cpfInUse: Student | null = await studentRepo.findOneBy({ cpf: cpf });

    if (cpfInUse) {
      throw new AppError("CPF already in use", 409);
    }
  } else if (method === "PATCH") {
    const studentId = req.params.studentId;

   
    const foundStudent: Student | null = await studentRepo.findOneBy({
      id: Number(studentId),
    });

    if (!foundStudent) {
      throw new AppError("Student not found", 404);
    }

    
    if (foundStudent.cpf !== cpf) {
      const cpfInUse: Student | null = await studentRepo.findOneBy({
        cpf: cpf,
      });

      if (cpfInUse) {
        throw new AppError("CPF already in use", 409);
      }
    }
  }

  next();
};
