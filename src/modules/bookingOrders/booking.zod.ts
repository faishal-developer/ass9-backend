import { z } from "zod";

const createBooking = z.object({
  body: z.array(
    z.object({
      serviceId: z.string({ required_error: "ServiceId is required" }),
      userId: z.string({ required_error: "UserId is required" }),
      timeSlot: z.object({
        startsTime: z.number(),
        endsTime: z.number(),
      }),
      status: z.string({
        required_error: "Role is required",
      }),
    })
  ),
});

const updateBooking = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    userId: z.string().optional(),
    timeSlot: z
      .object({
        startsTime: z.string(),
        endsTime: z.string(),
      })
      .optional(),
    status: z.string().optional(),
  }),
});

export const BookingZodValidataion = {
  createBooking,
  updateBooking,
};
