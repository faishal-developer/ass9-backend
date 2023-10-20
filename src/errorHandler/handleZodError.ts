import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../Interface/Interfaces";
import { ZodError } from "zod";

export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: "Zod validation Error",
    errorMessages: errors,
  };
};
