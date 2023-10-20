"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogZodValidataion = void 0;
const zod_1 = require("zod");
const createBlog = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "userId is required" }),
        title: zod_1.z.string({ required_error: "title is required" }),
        description: zod_1.z.string({ required_error: "description is required" }),
        image: zod_1.z.string({ required_error: "image is required" }),
    }),
});
const updateBlog = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.blogZodValidataion = {
    createBlog,
    updateBlog,
};
