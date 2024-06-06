import "express-async-errors";
import express, { Application, json } from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { routes } from "./routes";

const cors = require("cors");
export const app: Application = express();

app.use(json());
app.use(cors({ origin: "*" }));
app.use("/", routes);

app.use(handleErrors);
