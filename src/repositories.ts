import { Repository } from "typeorm";
import Student from "./entities/Student.entity";
import { AppDataSource } from "./data-source";

export const studentRepo: Repository<Student> =
  AppDataSource.getRepository(Student);
