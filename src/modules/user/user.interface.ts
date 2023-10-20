import { Model } from "mongoose";

export type Irole = "user" | "admin" | "super-admin";
export type IUser = {
  email: string;
  phoneNumber: string;
  role: Irole;
  password?: string;
  name: string;
};

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser> | null>;
} & Model<IUser>;

export type IPayload = {
  email: string;
  role: Irole;
  _id: string;
};
