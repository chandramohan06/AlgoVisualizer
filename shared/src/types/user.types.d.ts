import { Role } from '../enums/roles.enum';
export interface ILearningPreferences {
    preferredLanguage: 'Java' | 'C++' | 'Python' | 'Pseudo';
    preferredDifficulty: 'Easy' | 'Medium' | 'Hard';
    dailyGoalQuestions: number;
    studyReminder: boolean;
    visualizationSpeed: number;
    autoPlayAnimation: boolean;
}
export interface INotificationSettings {
    emailNotifications: boolean;
    quizReminder: boolean;
    dailyGoalReminder: boolean;
    contestReminder: boolean;
    leaderboardUpdates: boolean;
    achievementNotifications: boolean;
}
export interface IPrivacySettings {
    publicProfile: boolean;
    showRank: boolean;
    showCollege: boolean;
    showAchievements: boolean;
    hideActivity: boolean;
}
export interface IAppearanceSettings {
    theme: 'dark' | 'light' | 'system';
    accentColor: 'indigo' | 'emerald' | 'amber' | 'cyan' | 'rose';
    fontSize: 'small' | 'medium' | 'large';
    animationSpeed: number;
    compactMode: boolean;
}
export interface IUser {
    _id: string;
    name: string;
    email: string;
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
    streak: number;
    longestStreak?: number;
    xp?: number;
    learningPreferences?: ILearningPreferences;
    notificationSettings?: INotificationSettings;
    privacySettings?: IPrivacySettings;
    appearanceSettings?: IAppearanceSettings;
    lastActiveDate?: string;
    createdAt: string;
    updatedAt: string;
}
export interface IUserPublic {
    _id: string;
    name: string;
    avatar?: string;
    bio?: string;
    college?: string;
    batch?: string;
    country?: string;
    targetCompany?: string;
    github?: string;
    linkedin?: string;
    leetcode?: string;
    streak: number;
    createdAt: string;
}
export interface IAuthTokens {
    accessToken: string;
}
export interface ILoginDto {
    email: string;
    password: string;
}
export interface IRegisterDto {
    name: string;
    email: string;
    password: string;
}
export interface IUpdateProfileDto {
    name?: string;
    phone?: string;
    bio?: string;
    college?: string;
    batch?: string;
    country?: string;
    targetCompany?: string;
    github?: string;
    linkedin?: string;
    leetcode?: string;
    avatar?: string;
    learningPreferences?: Partial<ILearningPreferences>;
    notificationSettings?: Partial<INotificationSettings>;
    privacySettings?: Partial<IPrivacySettings>;
    appearanceSettings?: Partial<IAppearanceSettings>;
}
export interface IChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export interface ISystemSettings {
    _id?: string;
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
    updatedAt?: string;
}
export interface IAuditLogItem {
    _id: string;
    adminId: {
        _id: string;
        name: string;
        email: string;
    };
    action: string;
    targetId?: string;
    targetType?: string;
    details?: string;
    ipAddress?: string;
    createdAt: string;
}
export interface IAdminOverviewStats {
    totalStudents: number;
    activeStudentsToday: number;
    questionsSolvedToday: number;
    quizAttemptsToday: number;
    averageAccuracy: number;
    newRegistrationsCount: number;
    topPerformers: {
        _id: string;
        name: string;
        email: string;
        college?: string;
        avatar?: string;
        xp: number;
        rank: number;
    }[];
}
