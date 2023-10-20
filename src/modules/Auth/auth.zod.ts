import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const loginZodValidataion = {
  loginSchema,
  refreshTokenZodSchema,
};
