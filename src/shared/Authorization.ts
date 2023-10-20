import { NextFunction, Request, Response } from "express";
import ApiError from "../errorHandler/ApiError";
import httpStatus from "http-status";
import { verifyAccessToken } from "./commonFunction";

export const auth =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      let verifiedUser = verifyAccessToken(token);
      console.log(roles, verifiedUser.role);
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
