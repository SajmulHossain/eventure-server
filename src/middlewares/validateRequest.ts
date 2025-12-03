import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
};