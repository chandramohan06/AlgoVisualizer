import { SystemSettings, ISystemSettingsDocument } from '../models/SystemSettings.model';
import { logAdminAction } from './auditLog.service';

export const getSystemSettings = async (): Promise<ISystemSettingsDocument> => {
  let settings = await SystemSettings.findOne();
  if (!settings) {
    settings = await SystemSettings.create({
      platformName: 'AlgoVisualizer DSA Platform',
      description: 'Interactive DSA Visualization & Learning Platform for CS Students',
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      defaultRole: 'student',
      maxLoginAttempts: 5,
      jwtExpiry: '7d',
      passwordMinLength: 8,
      sessionTimeoutMinutes: 120,
      rateLimitPerMin: 100,
      auditLogging: true,
      enableLeaderboard: true,
      passingPercentage: 70,
      negativeMarking: false,
      timeLimitDefault: 15,
      randomQuestions: true,
      supportedLanguages: ['Java', 'C++', 'Python', 'Pseudo'],
      googleAnalyticsId: '',
      clarityId: '',
      trackingToggle: true,
    });
  }
  return settings;
};

export const updateSystemSettings = async (
  newSettings: Partial<ISystemSettingsDocument>,
  adminId: string,
): Promise<ISystemSettingsDocument> => {
  let settings = await getSystemSettings();

  Object.assign(settings, newSettings);
  await settings.save();

  await logAdminAction(
    adminId,
    'updated_system_settings',
    String(settings._id),
    'SystemSettings',
    'Updated platform configuration parameters',
  );

  return settings;
};
