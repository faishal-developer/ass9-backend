import { z } from "zod";
import { role } from "./user.model";

const createUser = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(4, {
        message: "Minimum 4 charecter allowed",
      })
      .max(25, {
        message: "Maximum 25 charecter allowed",
      }),
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: "Role is required",
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
    name: z.string().min(4).max(25).optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
  }),
});

export const userZodValidataion = {
  createUser,
  updateUser,
};
