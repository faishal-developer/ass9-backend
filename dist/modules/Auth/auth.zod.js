"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginZodValidataion = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "Password is required" }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.loginZodValidataion = {
    loginSchema,
    refreshTokenZodSchema,
};
