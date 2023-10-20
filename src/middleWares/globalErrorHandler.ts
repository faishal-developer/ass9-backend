import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../config/config";
import { ZodError } from "zod";
import ApiError from "../errorHandler/ApiError";
import { handleValidationError } from "../errorHandler/handleValidationError";
import { IGenericErrorMessage } from "../Interface/Interfaces";
import { handleZodError } from "../errorHandler/handleZodError";
import { handleCastError } from "../errorHandler/handleCastError";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === "development"
    ? console.log("error occured")
    : console.log("should log error file");

  let statusCode: number = 500;
  let message: string = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "validationError") {
    ({ statusCode, message, errorMessages } = handleValidationError(error));
  } else if (error instanceof ZodError) {
    ({ statusCode, message, errorMessages } = handleZodError(error));
  } else if (error?.name === "castError") {
    ({ statusCode, message, errorMessages } = handleCastError(error));
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};
