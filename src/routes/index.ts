import { Router } from "express";
import { studentRouter } from "./students.router";

export const routes: Router = Router();

routes.use("/students", studentRouter);
