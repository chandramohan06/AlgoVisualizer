import { Response } from 'express';

interface ApiSuccessOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendSuccess = <T>({
  res,
  statusCode = 200,
  message = 'Success',
  data,
  meta,
}: ApiSuccessOptions<T>): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
    meta: meta ?? null,
  });
};

export const sendError = (res: Response, statusCode: number, message: string): void => {
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
