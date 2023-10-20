"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingZodValidataion = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.array(zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: "ServiceId is required" }),
        userId: zod_1.z.string({ required_error: "UserId is required" }),
        timeSlot: zod_1.z.object({
            startsTime: zod_1.z.number(),
            endsTime: zod_1.z.number(),
        }),
        status: zod_1.z.string({
            required_error: "Role is required",
        }),
    })),
});
const updateBooking = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        timeSlot: zod_1.z
            .object({
            startsTime: zod_1.z.string(),
            endsTime: zod_1.z.string(),
        })
            .optional(),
        status: zod_1.z.string().optional(),
    }),
});
exports.BookingZodValidataion = {
    createBooking,
    updateBooking,
};
