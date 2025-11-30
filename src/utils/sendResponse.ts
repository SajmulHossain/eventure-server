import type { Response } from "express";

interface IMeta {
  total: number;
  page: number;
  limit: number;
}

interface IResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: IMeta;
}

export const sendResponse = <T>(res: Response,{ data, message, statusCode, meta }: IResponseData<T>): void => {
  res.status(statusCode).json({
    message,
    data,
    success: true,
    meta,
  });
};