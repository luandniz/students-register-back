import Student from "../entities/Student.entity";
import AppError from "../errors/AppError.error";
import { studentRepo } from "../repositories";

export const createStudentService = async (
  data: Omit<Student, "id">
): Promise<Student> => {
  const newStudent: Student = await studentRepo.save(data);

  return newStudent;
};

export const readStudentsService = async (): Promise<Student[]> => {
  const students: Student[] = await studentRepo.find();

  return students;
};

export const updateStudentService = async (
  student: Student,
  data: Partial<Student>
): Promise<Student> => {
  return await studentRepo.save({ ...student, ...data });
};

export const deleteStudentService = async (student: Student): Promise<void> => {
  await studentRepo.remove(student);
};
