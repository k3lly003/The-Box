import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;
  const message = error.message || "Internal server error.";
  res.status(statusCode).send({
    message,
    success: false,
    data: null,
  });
  console.log(error);
};

export default errorHandler;
