import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettingsDocument extends Document {
  platformName: string;
  platformLogo?: string;
  description?: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultRole: string;
  maxLoginAttempts: number;
  jwtExpiry: string;
  passwordMinLength: number;
  sessionTimeoutMinutes: number;
  rateLimitPerMin: number;
  auditLogging: boolean;
  enableLeaderboard: boolean;
  passingPercentage: number;
  negativeMarking: boolean;
  timeLimitDefault: number;
  randomQuestions: boolean;
  supportedLanguages: string[];
  googleAnalyticsId?: string;
  clarityId?: string;
  trackingToggle: boolean;
  updatedAt: Date;
}

const SystemSettingsSchema = new Schema<ISystemSettingsDocument>(
  {
    platformName: { type: String, default: 'AlgoVisualizer DSA Platform' },
    platformLogo: { type: String, default: '' },
    description: { type: String, default: 'Interactive DSA Visualization & Learning Platform for CS Students' },
    maintenanceMode: { type: Boolean, default: false },
    allowRegistration: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: true },
    defaultRole: { type: String, default: 'student' },
    maxLoginAttempts: { type: Number, default: 5 },
    jwtExpiry: { type: String, default: '7d' },
    passwordMinLength: { type: Number, default: 8 },
    sessionTimeoutMinutes: { type: Number, default: 120 },
    rateLimitPerMin: { type: Number, default: 100 },
    auditLogging: { type: Boolean, default: true },
    enableLeaderboard: { type: Boolean, default: true },
    passingPercentage: { type: Number, default: 70 },
    negativeMarking: { type: Boolean, default: false },
    timeLimitDefault: { type: Number, default: 15 },
    randomQuestions: { type: Boolean, default: true },
    supportedLanguages: { type: [String], default: ['Java', 'C++', 'Python', 'Pseudo'] },
    googleAnalyticsId: { type: String, default: '' },
    clarityId: { type: String, default: '' },
    trackingToggle: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const SystemSettings = mongoose.model<ISystemSettingsDocument>('SystemSettings', SystemSettingsSchema);
