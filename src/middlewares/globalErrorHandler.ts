/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleCastError } from "@/helpers/cast.error";
import { handlerDuplicateError } from "@/helpers/duplicate.error";
import { handleValidationError } from "@/helpers/validation.error";
import { handleZodError } from "@/helpers/zod.error";
import { IErrorSources } from "@/interface/error.interface";
import envConfig from "@config/env.config";
import { ApiError } from "@utils/ApiError";
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let errorSources: IErrorSources[] = [];

  if(envConfig.node_env === 'development') {
    console.log(error);
  }

  if (error.code === 11000) {
    const simplifiedError = handlerDuplicateError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError();
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error,
  });
};
