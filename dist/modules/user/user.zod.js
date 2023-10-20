"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidataion = void 0;
const zod_1 = require("zod");
const user_model_1 = require("./user.model");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email(),
        password: zod_1.z.string({ required_error: "Password is required" }),
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(4, {
            message: "Minimum 4 charecter allowed",
        })
            .max(25, {
            message: "Maximum 25 charecter allowed",
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        role: zod_1.z.enum([...user_model_1.role], {
            required_error: "Role is required",
        }),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z.string().min(4).max(25).optional(),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_model_1.role]).optional(),
    }),
});
exports.userZodValidataion = {
    createUser,
    updateUser,
};
