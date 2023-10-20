import { z } from "zod";

const createBlog = z.object({
  body: z.object({
    userId: z.string({ required_error: "userId is required" }),
    title: z.string({ required_error: "title is required" }),
    description: z.string({ required_error: "description is required" }),
    image: z.string({ required_error: "image is required" }),
  }),
});

const updateBlog = z.object({
  body: z.object({
    userId: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const blogZodValidataion = {
  createBlog,
  updateBlog,
};
