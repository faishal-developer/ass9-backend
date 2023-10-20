import mongoose from "mongoose";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../Interface/Interfaces";

export const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Invalid Id",
    },
  ];

  return {
    statusCode: 400,
    message: "Cast Error",
    errorMessages: errors,
  };
};
