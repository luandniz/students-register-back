import {
  createStudentController,
  deleteStudentController,
  readStudentsController,
  updatedStudentController,
} from "../../controllers/student.controller";
import {
  createStudentService,
  deleteStudentService,
  readStudentsService,
  updateStudentService,
} from "../../services/student.service";
import { Request, Response } from "express";

jest.mock("../../services/student.service");

describe("createStudentController", () => {
  it("should create a student and return 201 status", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        cpf: "123.456.789-10",
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (createStudentService as jest.Mock).mockResolvedValue(req.body);

    await createStudentController(req, res);

    expect(createStudentService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});

describe("readStudentsController", () => {
  it("should return a list of students", async () => {
    const req = {
      query: {
        name: "John",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const students = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        cpf: "123.456.789-10",
      },
    ];

    (readStudentsService as jest.Mock).mockResolvedValue(students);

    await readStudentsController(req, res);

    expect(readStudentsService).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(students);
  });
});

describe("updatedStudentController", () => {
  it("should update a student and return 200 status", async () => {
    const req = {
      body: {
        name: "Jane Doe",
      },
    } as Request;

    const res = {
      locals: {
        foundStudent: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          cpf: "123.456.789-10",
        },
      },
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedStudent = {
      ...res.locals.foundStudent,
      name: "Jane Doe",
    };

    (updateStudentService as jest.Mock).mockResolvedValue(updatedStudent);

    await updatedStudentController(req, res);

    expect(updateStudentService).toHaveBeenCalledWith(
      res.locals.foundStudent,
      req.body
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedStudent);
  });
});

describe("deleteStudentController", () => {
  it("should delete a student and return 204 status", async () => {
    const req = {} as Request;
    const res = {
      locals: {
        foundStudent: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          cpf: "123.456.789-10",
        },
      },
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (deleteStudentService as jest.Mock).mockResolvedValue(undefined);

    await deleteStudentController(req, res);

    expect(deleteStudentService).toHaveBeenCalledWith(res.locals.foundStudent);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalled();
  });
});
