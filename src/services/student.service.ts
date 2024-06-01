import Student from "../entities/Student.entity";
import AppError from "../errors/AppError.error";
import { studentRepo } from "../repositories";

export const createStudentService = async (
  data: Omit<Student, "id">
): Promise<Student> => {
  const newStudent: Student = await studentRepo.save(data);

  return newStudent;
};

export const readStudentsService = async (
  queryParams: Partial<Omit<Student, "id">>
): Promise<Student[]> => {
  const { name, email, cpf } = queryParams;
  const queryBuilder = studentRepo.createQueryBuilder("student");

  if (name) {
    queryBuilder.andWhere("student.name LIKE :name", { name: `%${name}%` });
  }

  if (email) {
    queryBuilder.andWhere("student.email LIKE :email", { email: `%${email}%` });
  }

  if (cpf) {
    queryBuilder.andWhere("student.cpf LIKE :cpf", { cpf: `%${cpf}%` });
  }

  const students: Student[] = await queryBuilder.getMany();
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
