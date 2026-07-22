import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { Progress } from '../models/Progress.model';
import { Bookmark } from '../models/Bookmark.model';
import { Achievement } from '../models/Achievement.model';
import { Note } from '../models/Note.model';
import { QuizAttempt } from '../models/QuizAttempt.model';
import { ActivityLog } from '../models/ActivityLog.model';
import { Leaderboard } from '../models/Leaderboard.model';
import { AppError } from '../utils/AppError';
import { cloudinary } from '../config/cloudinary';

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select(
    '-passwordHash -refreshToken -resetPasswordToken -resetPasswordExpiry -emailVerifyToken',
  );
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateProfile = async (userId: string, data: Record<string, any>) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  if (data.name !== undefined) user.name = data.name;
  if (data.phone !== undefined) user.phone = data.phone;
  if (data.bio !== undefined) user.bio = data.bio;
  if (data.college !== undefined) user.college = data.college;
  if (data.batch !== undefined) user.batch = data.batch;
  if (data.country !== undefined) user.country = data.country;
  if (data.targetCompany !== undefined) user.targetCompany = data.targetCompany;
  if (data.github !== undefined) user.github = data.github;
  if (data.linkedin !== undefined) user.linkedin = data.linkedin;
  if (data.leetcode !== undefined) user.leetcode = data.leetcode;
  if (data.avatar !== undefined) user.avatar = data.avatar;

  if (data.learningPreferences) {
    user.learningPreferences = { ...(user.learningPreferences as any), ...data.learningPreferences };
  }
  if (data.notificationSettings) {
    user.notificationSettings = { ...(user.notificationSettings as any), ...data.notificationSettings };
  }
  if (data.privacySettings) {
    user.privacySettings = { ...(user.privacySettings as any), ...data.privacySettings };
  }
  if (data.appearanceSettings) {
    user.appearanceSettings = { ...(user.appearanceSettings as any), ...data.appearanceSettings };
  }

  await user.save();
  return user;
};

export const changePassword = async (userId: string, currentPass: string, newPass: string) => {
  const user = await User.findById(userId).select('+passwordHash');
  if (!user) throw new AppError('User not found', 404);

  const isValid = await bcrypt.compare(currentPass, user.passwordHash);
  if (!isValid) throw new AppError('Current password is incorrect', 400);

  if (newPass.length < 8) throw new AppError('New password must be at least 8 characters long', 400);

  user.passwordHash = await bcrypt.hash(newPass, 10);
  await user.save();

  return { message: 'Password changed successfully' };
};

export const exportUserData = async (userId: string) => {
  const user = await User.findById(userId).select('-passwordHash -refreshToken -resetPasswordToken');
  if (!user) throw new AppError('User not found', 404);

  const [progress, attempts, notes, bookmarks, activity, leaderboard] = await Promise.all([
    Progress.find({ userId }).lean(),
    QuizAttempt.find({ userId }).lean(),
    Note.find({ userId }).lean(),
    Bookmark.find({ userId }).lean(),
    ActivityLog.find({ userId }).lean(),
    Leaderboard.findOne({ userId }).lean(),
  ]);

  return {
    exportDate: new Date().toISOString(),
    profile: user,
    leaderboardStats: leaderboard,
    learningProgress: progress,
    quizHistory: attempts,
    notes,
    bookmarks,
    activityTimeline: activity,
  };
};

export const deleteAccountRequest = async (userId: string, passwordConfirm: string) => {
  const user = await User.findById(userId).select('+passwordHash');
  if (!user) throw new AppError('User not found', 404);

  const isValid = await bcrypt.compare(passwordConfirm, user.passwordHash);
  if (!isValid) throw new AppError('Password confirmation failed', 400);

  await Promise.all([
    User.findByIdAndDelete(userId),
    Progress.deleteMany({ userId }),
    QuizAttempt.deleteMany({ userId }),
    Note.deleteMany({ userId }),
    Bookmark.deleteMany({ userId }),
    ActivityLog.deleteMany({ userId }),
    Leaderboard.deleteMany({ userId }),
  ]);

  return { message: 'Account and associated data deleted successfully' };
};

export const updateAvatar = async (userId: string, fileOrUri?: Express.Multer.File | string) => {
  let avatarUrl = '';

  if (typeof fileOrUri === 'string') {
    avatarUrl = fileOrUri;
  } else if (fileOrUri && fileOrUri.buffer) {
    const b64 = Buffer.from(fileOrUri.buffer).toString('base64');
    const dataUri = `data:${fileOrUri.mimetype};base64,${b64}`;

    try {
      if (cloudinary && cloudinary.config().cloud_name) {
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: 'algovisualizer/avatars',
          transformation: [{ width: 250, height: 250, crop: 'fill', gravity: 'face' }],
        });
        avatarUrl = result.secure_url;
      } else {
        avatarUrl = dataUri;
      }
    } catch (err) {
      avatarUrl = dataUri;
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar: avatarUrl },
    { new: true },
  ).select('-passwordHash -refreshToken');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const deleteAvatar = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $unset: { avatar: 1 } },
    { new: true },
  ).select('-passwordHash -refreshToken');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const getProgress = async (userId: string) => {
  return Progress.find({ userId }).populate('algorithmId', 'slug title difficulty category');
};

export const getBookmarks = async (userId: string) => {
  const bookmarks = await Bookmark.find({ userId })
    .populate({
      path: 'algorithmId',
      select: 'slug title difficulty category',
      populate: {
        path: 'category',
        select: 'name',
      },
    })
    .sort({ createdAt: -1 });

  return bookmarks
    .filter((b) => b.algorithmId)
    .map((b) => {
      const algo = b.algorithmId as any;
      return {
        _id: algo._id,
        slug: algo.slug,
        title: algo.title,
        difficulty: algo.difficulty,
        category: algo.category?.name || 'General',
      };
    });
};

export const getAchievements = async (userId: string) => {
  return Achievement.find({ userId }).sort({ unlockedAt: -1 });
};

export const getNotes = async (userId: string) => {
  return Note.find({ userId }).sort({ updatedAt: -1 });
};

export const getQuizHistory = async (userId: string) => {
  return QuizAttempt.find({ userId })
    .populate('algorithmId', 'slug title')
    .sort({ completedAt: -1 })
    .limit(20);
};

export const getStreak = async (userId: string) => {
  const user = await User.findById(userId).select('streak lastActiveDate');
  if (!user) throw new AppError('User not found', 404);
  return { streak: user.streak, lastActiveDate: user.lastActiveDate };
};

export const getPublicProfile = async (userId: string) => {
  const user = await User.findById(userId).select('name avatar bio college github linkedin leetcode streak createdAt');
  if (!user) throw new AppError('User not found', 404);
  return user;
};
