import { NextFunction, Request, Response } from "express";

interface ErrorInterface {
  stack: string;
  message: string;
  status: string;
  statusCode: number;
}

export default (
  err: ErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { stack, message, status, statusCode = 500 } = err;

  res.status(statusCode).json({
    message,
    status,
  });

  console.error({ stack });
};
