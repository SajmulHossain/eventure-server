import type { NextFunction, Request, Response } from "express";

type FnType = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsync = (fn: FnType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => next(error));
  };
};