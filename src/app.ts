import "express-async-errors";
import express, { Application, json } from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { routes } from "./routes";

const cors = require("cors");
export const app: Application = express();

app.use(json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/", routes);

app.use(handleErrors);
