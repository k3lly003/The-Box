import express, { Request, Response } from "express";
import errorHandler from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import * as swagger from "../docs/swagger.json";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

//                                  ROUTES
// SWAGGER ROUTES
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

// APPLICATION ROUTES
// app.use("/application", application);

// APPLICANTS ROUTES
// app.use("/applications/applicants", applicants);

// APPOINTMENTS ROUTES
// app.use("/appointments", appointments);

//                                  SWAGGER
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use(errorHandler);

export default app;
