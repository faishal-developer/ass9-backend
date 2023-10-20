import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        url: req.url,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
