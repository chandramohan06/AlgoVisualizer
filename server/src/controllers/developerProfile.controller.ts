import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as DeveloperProfileService from '../services/developerProfile.service';

export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  const data = await DeveloperProfileService.getDeveloperProfile();
  sendSuccess({ res, data });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id ? req.user._id.toString() : undefined;
  const data = await DeveloperProfileService.updateDeveloperProfile(req.body, userId);
  sendSuccess({ res, message: 'Founder profile updated successfully', data });
});

export const uploadPhoto = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id ? req.user._id.toString() : undefined;
  const fileOrUrl = req.file || req.body.avatarUrl || req.body.file;
  const data = await DeveloperProfileService.updatePhoto(fileOrUrl, userId);
  sendSuccess({ res, message: 'Founder photo updated successfully', data });
});

export const uploadResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id ? req.user._id.toString() : undefined;
  const fileOrUrl = req.file || req.body.resumeUrl || req.body.file;
  const data = await DeveloperProfileService.updateResume(fileOrUrl, userId);
  sendSuccess({ res, message: 'Founder resume updated successfully', data });
});

export const deletePhoto = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id ? req.user._id.toString() : undefined;
  const data = await DeveloperProfileService.deletePhoto(userId);
  sendSuccess({ res, message: 'Founder photo deleted successfully', data });
});

export const deleteResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id ? req.user._id.toString() : undefined;
  const data = await DeveloperProfileService.deleteResume(userId);
  sendSuccess({ res, message: 'Founder resume deleted successfully', data });
});



