import { z } from "zod";

const createFaq = z.object({
  body: z.object({
    userId: z.string({ required_error: "UserId is required" }),
    question: z.string({ required_error: "question is required" }),
    ans: z.string().optional(),
  }),
});

const updateFaq = z.object({
  body: z.object({
    userId: z.string().optional(),
    question: z.string().optional(),
    ans: z.string().optional(),
  }),
});

export const FaqZodValidataion = {
  createFaq,
  updateFaq,
};
