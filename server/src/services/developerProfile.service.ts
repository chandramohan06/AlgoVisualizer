import { DeveloperProfile, IDeveloperProfile } from '../models/DeveloperProfile.model';
import { AppError } from '../utils/AppError';

export const getDeveloperProfile = async (): Promise<IDeveloperProfile> => {
  let profile = await DeveloperProfile.findOne();
  if (!profile) {
    profile = await DeveloperProfile.create({});
  }
  return profile;
};

export const updateDeveloperProfile = async (
  payload: Partial<IDeveloperProfile>
): Promise<IDeveloperProfile> => {
  let profile = await DeveloperProfile.findOne();
  if (!profile) {
    profile = await DeveloperProfile.create(payload);
  } else {
    Object.assign(profile, payload);
    await profile.save();
  }
  return profile;
};

export const updatePhoto = async (avatarUrl: string): Promise<IDeveloperProfile> => {
  if (!avatarUrl) {
    throw new AppError('Avatar URL or image data is required', 400);
  }
  let profile = await getDeveloperProfile();
  profile.avatarUrl = avatarUrl;
  await profile.save();
  return profile;
};

export const updateResume = async (resumeUrl: string): Promise<IDeveloperProfile> => {
  if (!resumeUrl) {
    throw new AppError('Resume URL is required', 400);
  }
  let profile = await getDeveloperProfile();
  profile.resumeUrl = resumeUrl;
  await profile.save();
  return profile;
};

export const deletePhoto = async (): Promise<IDeveloperProfile> => {
  let profile = await getDeveloperProfile();
  profile.avatarUrl = '';
  await profile.save();
  return profile;
};

export const deleteResume = async (): Promise<IDeveloperProfile> => {
  let profile = await getDeveloperProfile();
  profile.resumeUrl = '';
  await profile.save();
  return profile;
};
