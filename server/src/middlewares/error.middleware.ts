import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
  path?: string;
  value?: unknown;
  errors?: Record<string, { message: string }>;
}

export const errorMiddleware = (
  err: MongoError | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if ((err as MongoError).code === 11000) {
    // Duplicate key
    const field = Object.keys((err as MongoError).keyValue || {})[0];
    statusCode = 409;
    message = `${field} already exists`;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    const mongoErr = err as MongoError;
    message = Object.values(mongoErr.errors || {})
      .map((e) => e.message)
      .join(', ');
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${(err as MongoError).path}: ${(err as MongoError).value}`;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
