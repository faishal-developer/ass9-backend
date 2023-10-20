import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config/config";
import { IOptions, IResult } from "../Interface/Interfaces";

export const calcSkip = (
  page: string | undefined,
  limit: string | undefined
) => {
  let newPage = Number(page || 1);
  let newLimit = Number(limit || 10);
  return {
    page: newPage,
    limit: newLimit,
    skip: (newPage - 1) * newLimit,
  };
};

export const generateAccessToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });
};

export const generateRefreashToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, config.jwt.refresh_secret as Secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
};
export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.refresh_secret as Secret) as JwtPayload;
};

export const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};

export const calculatePagination = (options: IOptions): IResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
