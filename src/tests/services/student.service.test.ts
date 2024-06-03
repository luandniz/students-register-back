import {
  createStudentService,
  deleteStudentService,
  readStudentsService,
  updateStudentService,
} from "../../services/student.service";
import { studentRepo } from "../../repositories";
import Student from "../../entities/Student.entity";

jest.mock("@/repositories");

describe("createStudentService", () => {
  it("should save a student and return it", async () => {
    const studentData = {
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-10",
    };
    const savedStudent = { id: 1, ...studentData } as Student;

    (studentRepo.save as jest.Mock).mockResolvedValue(savedStudent);

    const result = await createStudentService(studentData);

    expect(studentRepo.save).toHaveBeenCalledWith(studentData);
    expect(result).toEqual(savedStudent);
  });
});

describe("readStudentsService", () => {
  it("should return a list of students based on query parameters", async () => {
    const queryParams = {
      name: "John",
    };
    const students = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        cpf: "123.456.789-10",
      } as Student,
    ];

    const queryBuilder: any = {
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(students),
    };

    (studentRepo.createQueryBuilder as jest.Mock).mockReturnValue(queryBuilder);

    const result = await readStudentsService(queryParams);

    expect(studentRepo.createQueryBuilder).toHaveBeenCalledWith("student");
    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      "student.name ILIKE :name",
      { name: `%John%` }
    );
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(result).toEqual(students);
  });
});

describe("updateStudentService", () => {
  it("should update and return the student", async () => {
    const existingStudent = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-10",
    } as Student;

    const updateData = {
      name: "Jane Doe",
    };

    const updatedStudent = {
      ...existingStudent,
      ...updateData,
    };

    (studentRepo.save as jest.Mock).mockResolvedValue(updatedStudent);

    const result = await updateStudentService(existingStudent, updateData);

    expect(studentRepo.save).toHaveBeenCalledWith(updatedStudent);
    expect(result).toEqual(updatedStudent);
  });
});

describe("deleteStudentService", () => {
  it("should delete the student", async () => {
    const studentToDelete = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-10",
    } as Student;

    (studentRepo.remove as jest.Mock).mockResolvedValue(undefined);

    await deleteStudentService(studentToDelete);

    expect(studentRepo.remove).toHaveBeenCalledWith(studentToDelete);
  });
});
