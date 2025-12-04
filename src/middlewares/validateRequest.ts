import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
   try {
     if (req.body?.data) {
       req.body = JSON.parse(req.body.data);
     }
     req.body = await schema.parseAsync(req.body);
     next();
   } catch (error) {
    next(error);
   }
  };
};