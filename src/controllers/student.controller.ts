import { Request, Response } from "express";
import {
  createStudentService,
  deleteStudentService,
  readStudentsService,
  updateStudentService,
} from "../services/student.service";
import Student from "../entities/Student.entity";

export const createStudentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const student: Student = await createStudentService(req.body);

  return res.status(201).json(student);
};

export const readStudentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryParams = {
    name: req.query.name as string,
    email: req.query.email as string,
    cpf: req.query.cpf as string,
  };

  const students = await readStudentsService(queryParams);

  return res.status(200).json(students);
};

export const readStudentByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json(res.locals.foundStudent);
};

export const updatedStudentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { foundStudent } = res.locals;
  const student: Student = await updateStudentService(foundStudent, req.body);

  return res.status(200).json(student);
};

export const deleteStudentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteStudentService(res.locals.foundStudent);

  return res.status(204).json();
};
