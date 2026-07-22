import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from '../utils/AppError';
import { Role } from '@algovisualizer/shared';

/**
 * Role-based access control middleware.
 * Usage: router.get('/admin-route', authenticate, authorize(Role.ADMIN), handler)
 */
export const authorize =
  (...roles: Role[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }
    if (!roles.includes(req.user.role as Role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
