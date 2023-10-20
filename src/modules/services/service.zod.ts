import { z } from "zod";

const createService = z.object({
  body: z.object({
    image: z.string({ required_error: "ImageUrl is required" }).url(),
    price: z.number({ required_error: "Price is required" }),
    name: z
      .string({
        required_error: "Title is required",
      })
      .min(4, {
        message: "Minimum 4 charecter allowed",
      })
      .max(50, {
        message: "Maximum 50 charecter allowed",
      }),
    description: z.string({
      required_error: "Description is required",
    }),
    availableTimeSlots: z.array(
      z.object({
        startsTime: z.number(),
        endsTime: z.number(),
      })
    ),
  }),
});

const updateService = z.object({
  body: z.object({
    image: z.string().url().optional(),
    price: z.number().optional(),
    name: z
      .string()
      .min(4, {
        message: "Minimum 4 charecter allowed",
      })
      .max(50, {
        message: "Maximum 50 charecter allowed",
      })
      .optional(),
    description: z.string().optional(),
    availableTimeSlots: z
      .array(
        z.object({
          startsTime: z.number(),
          endsTime: z.number(),
        })
      )
      .optional(),
  }),
});

export const serviceZodValidataion = {
  createService,
  updateService,
};
