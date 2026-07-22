import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rateLimit.middleware';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post(
  '/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  AuthController.register,
);

router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  AuthController.login,
);

router.post('/logout', authenticate, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/forgot-password', authLimiter, AuthController.forgotPassword);
router.post('/reset-password/:token', authLimiter, AuthController.resetPassword);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.get('/me', authenticate, AuthController.getMe);

export default router;
