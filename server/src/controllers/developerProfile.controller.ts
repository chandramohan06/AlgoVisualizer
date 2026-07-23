import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as DeveloperProfileService from '../services/developerProfile.service';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const data = await DeveloperProfileService.getDeveloperProfile();
  sendSuccess({ res, data });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const data = await DeveloperProfileService.updateDeveloperProfile(req.body);
  sendSuccess({ res, message: 'Developer profile updated successfully', data });
});

export const uploadPhoto = asyncHandler(async (req: Request, res: Response) => {
  const { avatarUrl } = req.body;
  const data = await DeveloperProfileService.updatePhoto(avatarUrl);
  sendSuccess({ res, message: 'Developer avatar updated successfully', data });
});

export const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  const { resumeUrl } = req.body;
  const data = await DeveloperProfileService.updateResume(resumeUrl);
  sendSuccess({ res, message: 'Developer resume updated successfully', data });
});

export const deletePhoto = asyncHandler(async (req: Request, res: Response) => {
  const data = await DeveloperProfileService.deletePhoto();
  sendSuccess({ res, message: 'Developer avatar deleted successfully', data });
});

export const deleteResume = asyncHandler(async (req: Request, res: Response) => {
  const data = await DeveloperProfileService.deleteResume();
  sendSuccess({ res, message: 'Developer resume deleted successfully', data });
});
