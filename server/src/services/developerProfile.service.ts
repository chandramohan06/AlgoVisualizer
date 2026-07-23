import { DeveloperProfile, IDeveloperProfile } from '../models/DeveloperProfile.model';
import { AppError } from '../utils/AppError';
import { cloudinary } from '../config/cloudinary';

export const getDeveloperProfile = async (): Promise<IDeveloperProfile> => {
  let profile = await DeveloperProfile.findOne();
  if (!profile) {
    profile = await DeveloperProfile.create({});
  }
  return profile;
};

export const updateDeveloperProfile = async (
  payload: Partial<IDeveloperProfile>,
  userId?: string
): Promise<IDeveloperProfile> => {
  let profile = await DeveloperProfile.findOne();
  if (!profile) {
    profile = await DeveloperProfile.create({
      ...payload,
      createdBy: userId,
      updatedBy: userId,
      version: 1,
    });
  } else {
    // Prevent overriding version directly
    const nextVersion = (profile.version || 1) + 1;
    Object.assign(profile, payload, {
      updatedBy: userId || profile.updatedBy,
      version: nextVersion,
    });
    await profile.save();
  }
  return profile;
};

export const updatePhoto = async (
  fileOrUrl: Express.Multer.File | string,
  userId?: string
): Promise<IDeveloperProfile> => {
  let avatarUrl = '';

  if (typeof fileOrUrl === 'string') {
    avatarUrl = fileOrUrl;
  } else if (fileOrUrl && fileOrUrl.buffer) {
    const b64 = Buffer.from(fileOrUrl.buffer).toString('base64');
    const dataUri = `data:${fileOrUrl.mimetype};base64,${b64}`;

    try {
      if (cloudinary && cloudinary.config().cloud_name) {
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: 'algovisualizer/founder',
          transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
        });
        avatarUrl = result.secure_url;
      } else {
        avatarUrl = dataUri;
      }
    } catch {
      avatarUrl = dataUri;
    }
  }

  if (!avatarUrl) {
    throw new AppError('Profile photo or valid image file is required', 400);
  }

  let profile = await getDeveloperProfile();
  profile.avatarUrl = avatarUrl;
  profile.updatedBy = userId || profile.updatedBy;
  profile.version = (profile.version || 1) + 1;
  await profile.save();
  return profile;
};

export const updateResume = async (
  fileOrUrl: Express.Multer.File | string,
  userId?: string
): Promise<IDeveloperProfile> => {
  let resumeUrl = '';

  if (typeof fileOrUrl === 'string') {
    resumeUrl = fileOrUrl;
  } else if (fileOrUrl && fileOrUrl.buffer) {
    const b64 = Buffer.from(fileOrUrl.buffer).toString('base64');
    const dataUri = `data:${fileOrUrl.mimetype};base64,${b64}`;

    try {
      if (cloudinary && cloudinary.config().cloud_name) {
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: 'algovisualizer/resume',
          resource_type: 'raw',
        });
        resumeUrl = result.secure_url;
      } else {
        resumeUrl = dataUri;
      }
    } catch {
      resumeUrl = dataUri;
    }
  }

  if (!resumeUrl) {
    throw new AppError('Resume link or valid PDF document is required', 400);
  }

  let profile = await getDeveloperProfile();
  profile.resumeUrl = resumeUrl;
  profile.updatedBy = userId || profile.updatedBy;
  profile.version = (profile.version || 1) + 1;
  await profile.save();
  return profile;
};

export const deletePhoto = async (userId?: string): Promise<IDeveloperProfile> => {
  let profile = await getDeveloperProfile();
  profile.avatarUrl = '';
  profile.updatedBy = userId || profile.updatedBy;
  profile.version = (profile.version || 1) + 1;
  await profile.save();
  return profile;
};

export const deleteResume = async (userId?: string): Promise<IDeveloperProfile> => {
  let profile = await getDeveloperProfile();
  profile.resumeUrl = '';
  profile.updatedBy = userId || profile.updatedBy;
  profile.version = (profile.version || 1) + 1;
  await profile.save();
  return profile;
};

