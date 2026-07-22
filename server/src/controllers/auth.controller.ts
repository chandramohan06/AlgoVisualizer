import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as AuthService from '../services/auth.service';

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await AuthService.register(req.body);
  sendSuccess({ res, statusCode: 201, message: 'Account created. Please verify your email.', data: result });
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await AuthService.login(req.body);
  sendSuccess({ res, message: 'Login successful', data: result });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AuthService.logout(req.user!._id);
  sendSuccess({ res, message: 'Logged out successfully' });
});

export const refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshAccessToken(refreshToken);
  sendSuccess({ res, data: result });
});

export const forgotPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AuthService.forgotPassword(req.body.email);
  sendSuccess({ res, message: 'Password reset email sent if account exists' });
});

export const resetPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AuthService.resetPassword(req.params.token as string, req.body.password);
  sendSuccess({ res, message: 'Password reset successfully' });
});

export const verifyEmail = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AuthService.verifyEmail(req.params.token as string);
  sendSuccess({ res, message: 'Email verified successfully' });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await AuthService.getMe(req.user!._id);
  sendSuccess({ res, data: user });
});
