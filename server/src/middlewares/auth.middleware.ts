import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';
import { User } from '../models/User.model';
import { Role } from '@algovisualizer/shared';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
    email: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
      _id: string;
      role: string;
      email: string;
    };

    const user = await User.findById(decoded._id).select('-passwordHash -refreshToken');
    if (!user) throw new AppError('User not found', 401);
    if (user.isBanned) throw new AppError('Account is banned', 403);

    req.user = { _id: String(user._id), role: user.role, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuthenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
        _id: string;
        role: string;
        email: string;
      };

      const user = await User.findById(decoded._id).select('-passwordHash -refreshToken');
      if (user && !user.isBanned) {
        req.user = { _id: String(user._id), role: user.role, email: user.email };
      }
    }
    next();
  } catch {
    // Silently continue for optional auth
    next();
  }
};

export const authorize = (...roles: (Role | string)[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Access denied: insufficient permissions', 403);
    }

    next();
  };
};
