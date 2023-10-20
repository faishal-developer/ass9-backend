import { Model } from "mongoose";
import { IUser } from "../user/user.interface";

export type IAuth = {
  email: string;
  password: string;
};

export type AuthModel = Model<IAuth, Record<string, unknown>>;

export type AuthServiceresponseType = {
  accessToken: string;
  refreshToken: string;
  user?: Partial<IUser>;
};

export type refreshTokenResponse = {
  accessToken: string;
};
