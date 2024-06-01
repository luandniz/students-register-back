import { Router } from "express";
import {
  createStudentController,
  deleteStudentController,
  readStudentByIdController,
  readStudentsController,
  updatedStudentController,
} from "../controllers/student.controller";

import { verifyIdExists } from "../middlewares/verifyIdExists.middleware";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";
import { verifyCpfExists } from "../middlewares/verifyCpfExists.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  studentCreateSchema,
  studentUpdateSchema,
} from "../schemas/student.schemas";

export const studentRouter: Router = Router();

studentRouter.post(
  "/",
  validateBody(studentCreateSchema),
  verifyEmailExists,
  verifyCpfExists,
  createStudentController
);
studentRouter.get("/", readStudentsController);

studentRouter.use("/:studentId", verifyIdExists);

studentRouter.get("/:studentId", readStudentByIdController);
studentRouter.patch(
  "/:studentId",
  validateBody(studentUpdateSchema),
  verifyEmailExists,
  verifyCpfExists,
  updatedStudentController
);
studentRouter.delete("/:studentId", deleteStudentController);
