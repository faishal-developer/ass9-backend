"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqZodValidataion = void 0;
const zod_1 = require("zod");
const createFaq = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: "UserId is required" }),
        question: zod_1.z.string({ required_error: "question is required" }),
        ans: zod_1.z.string().optional(),
    }),
});
const updateFaq = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        question: zod_1.z.string().optional(),
        ans: zod_1.z.string().optional(),
    }),
});
exports.FaqZodValidataion = {
    createFaq,
    updateFaq,
};
