import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as UserService from '../services/user.service';

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserService.getProfile(req.user!._id);
  sendSuccess({ res, data: user });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserService.updateProfile(req.user!._id, req.body);
  sendSuccess({ res, message: 'Settings saved successfully', data: user });
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const result = await UserService.changePassword(req.user!._id, currentPassword, newPassword);
  sendSuccess({ res, message: result.message });
});

export const exportUserData = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.exportUserData(req.user!._id);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=my_algovisualizer_data.json');
  return res.status(200).send(JSON.stringify(data, null, 2));
});

export const deleteAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { password } = req.body;
  const result = await UserService.deleteAccountRequest(req.user!._id, password);
  sendSuccess({ res, message: result.message });
});

export const updateAvatar = asyncHandler(async (req: AuthRequest, res: Response) => {
  const payload = req.file || req.body.avatar;
  const user = await UserService.updateAvatar(req.user!._id, payload);
  sendSuccess({ res, message: 'Avatar updated successfully', data: user });
});

export const deleteAvatar = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserService.deleteAvatar(req.user!._id);
  sendSuccess({ res, message: 'Avatar removed successfully', data: user });
});

export const getProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getProgress(req.user!._id);
  sendSuccess({ res, data });
});

export const getBookmarks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getBookmarks(req.user!._id);
  sendSuccess({ res, data });
});

export const getAchievements = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getAchievements(req.user!._id);
  sendSuccess({ res, data });
});

export const getNotes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getNotes(req.user!._id);
  sendSuccess({ res, data });
});

export const getQuizHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getQuizHistory(req.user!._id);
  sendSuccess({ res, data });
});

export const getStreak = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getStreak(req.user!._id);
  sendSuccess({ res, data });
});

export const getPublicProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await UserService.getPublicProfile(req.params.userId as string);
  sendSuccess({ res, data: user });
});
