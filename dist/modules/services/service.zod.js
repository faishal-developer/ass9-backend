"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceZodValidataion = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string({ required_error: "ImageUrl is required" }).url(),
        price: zod_1.z.number({ required_error: "Price is required" }),
        name: zod_1.z
            .string({
            required_error: "Title is required",
        })
            .min(4, {
            message: "Minimum 4 charecter allowed",
        })
            .max(50, {
            message: "Maximum 50 charecter allowed",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        availableTimeSlots: zod_1.z.array(zod_1.z.object({
            startsTime: zod_1.z.number(),
            endsTime: zod_1.z.number(),
        })),
    }),
});
const updateService = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().url().optional(),
        price: zod_1.z.number().optional(),
        name: zod_1.z
            .string()
            .min(4, {
            message: "Minimum 4 charecter allowed",
        })
            .max(50, {
            message: "Maximum 50 charecter allowed",
        })
            .optional(),
        description: zod_1.z.string().optional(),
        availableTimeSlots: zod_1.z
            .array(zod_1.z.object({
            startsTime: zod_1.z.number(),
            endsTime: zod_1.z.number(),
        }))
            .optional(),
    }),
});
exports.serviceZodValidataion = {
    createService,
    updateService,
};
