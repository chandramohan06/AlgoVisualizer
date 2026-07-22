import mongoose, { Schema, Document } from 'mongoose';
import {
  Role,
  ILearningPreferences,
  INotificationSettings,
  IPrivacySettings,
  IAppearanceSettings,
} from '@algovisualizer/shared';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  avatar?: string;
  phone?: string;
  bio?: string;
  college?: string;
  batch?: string;
  country?: string;
  targetCompany?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  isEmailVerified: boolean;
  isBanned: boolean;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  emailVerifyToken?: string;
  streak: number;
  longestStreak: number;
  xp: number;
  learningPreferences?: ILearningPreferences;
  notificationSettings?: INotificationSettings;
  privacySettings?: IPrivacySettings;
  appearanceSettings?: IAppearanceSettings;
  lastActiveDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.STUDENT },
    avatar: { type: String },
    phone: { type: String, maxlength: 30 },
    bio: { type: String, maxlength: 500 },
    college: { type: String, maxlength: 200, default: 'General Institute' },
    batch: { type: String, maxlength: 50, default: '2026' },
    country: { type: String, maxlength: 50, default: 'India' },
    targetCompany: { type: String, maxlength: 100, default: 'Amazon' },
    github: { type: String },
    linkedin: { type: String },
    leetcode: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    refreshToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
    emailVerifyToken: { type: String },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    learningPreferences: {
      preferredLanguage: { type: String, default: 'Java' },
      preferredDifficulty: { type: String, default: 'Medium' },
      dailyGoalQuestions: { type: Number, default: 3 },
      studyReminder: { type: Boolean, default: true },
      visualizationSpeed: { type: Number, default: 1 },
      autoPlayAnimation: { type: Boolean, default: true },
    },
    notificationSettings: {
      emailNotifications: { type: Boolean, default: true },
      quizReminder: { type: Boolean, default: true },
      dailyGoalReminder: { type: Boolean, default: true },
      contestReminder: { type: Boolean, default: true },
      leaderboardUpdates: { type: Boolean, default: true },
      achievementNotifications: { type: Boolean, default: true },
    },
    privacySettings: {
      publicProfile: { type: Boolean, default: true },
      showRank: { type: Boolean, default: true },
      showCollege: { type: Boolean, default: true },
      showAchievements: { type: Boolean, default: true },
      hideActivity: { type: Boolean, default: false },
    },
    appearanceSettings: {
      theme: { type: String, default: 'dark' },
      accentColor: { type: String, default: 'indigo' },
      fontSize: { type: String, default: 'medium' },
      animationSpeed: { type: Number, default: 1 },
      compactMode: { type: Boolean, default: false },
    },
    lastActiveDate: { type: Date },
  },
  { timestamps: true },
);

UserSchema.index({ role: 1 });
UserSchema.index({ college: 1 });
UserSchema.index({ batch: 1 });
UserSchema.index({ targetCompany: 1 });
UserSchema.index({ xp: -1 });

export const User = mongoose.model<IUserDocument>('User', UserSchema);
