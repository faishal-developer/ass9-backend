import mongoose from "mongoose";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../Interface/Interfaces";

type vError = mongoose.Error.ValidationError;
export const handleValidationError = (err: vError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation error",
    errorMessages: errors,
  };
};
