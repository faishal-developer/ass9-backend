import { Schema, model } from "mongoose";
import { IUser, Irole } from "./user.interface";
import { UserModel } from "./user.interface";
import config from "../../config/config";
import bcrypt from "bcrypt";

export const role: Irole[] = ["user", "admin", "super-admin"];
const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: role, // Specify the enum values here
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne(
    { email },
    { password: 1, role: 1, name: 1, email: 1 }
  );
};
userSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
