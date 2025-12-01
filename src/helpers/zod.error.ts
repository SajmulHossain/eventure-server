/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorSources } from "@/interface/error.interface";
import { ZodError } from "zod";

export const handleZodError = (error: ZodError) => {
  const errorSources: IErrorSources[] = [];
  error.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    });
  });

  return {
    message: "Zod Error",
    statusCode: 400,
    errorSources,
  };
};
