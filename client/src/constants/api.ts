export const API_BASE = '/api/v1';

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_BASE}/auth/register`,
  AUTH_LOGIN: `${API_BASE}/auth/login`,
  AUTH_LOGOUT: `${API_BASE}/auth/logout`,
  AUTH_REFRESH: `${API_BASE}/auth/refresh-token`,
  AUTH_FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  AUTH_RESET_PASSWORD: (token: string) => `${API_BASE}/auth/reset-password/${token}`,
  AUTH_VERIFY_EMAIL: (token: string) => `${API_BASE}/auth/verify-email/${token}`,
  AUTH_ME: `${API_BASE}/auth/me`,

  // Users
  USER_PROFILE: `${API_BASE}/users/profile`,
  USER_SETTINGS: `${API_BASE}/users/settings`,
  USER_CHANGE_PASSWORD: `${API_BASE}/users/change-password`,
  USER_EXPORT_DATA: `${API_BASE}/users/export-data`,
  USER_DELETE_ACCOUNT: `${API_BASE}/users/delete-account`,
  USER_AVATAR: `${API_BASE}/users/avatar`,
  USER_PROGRESS: `${API_BASE}/users/progress`,
  USER_BOOKMARKS: `${API_BASE}/users/bookmarks`,
  USER_ACHIEVEMENTS: `${API_BASE}/users/achievements`,
  USER_NOTES: `${API_BASE}/users/notes`,
  USER_QUIZ_HISTORY: `${API_BASE}/users/quiz-history`,
  USER_PUBLIC_PROFILE: (userId: string) => `${API_BASE}/users/${userId}`,

  // Developer Profile
  DEVELOPER_PROFILE: `${API_BASE}/developer-profile`,
  DEVELOPER_PROFILE_PHOTO: `${API_BASE}/developer-profile/photo`,
  DEVELOPER_PROFILE_RESUME: `${API_BASE}/developer-profile/resume`,

  // Progress
  PROGRESS: `${API_BASE}/progress`,
  PROGRESS_SUMMARY: `${API_BASE}/progress/summary`,

  // Practice
  PRACTICE_CATEGORIES: `${API_BASE}/practice/categories`,
  PRACTICE_PATTERNS: `${API_BASE}/practice/patterns`,
  PRACTICE_QUESTIONS: `${API_BASE}/practice/questions`,
  PRACTICE_USER_PROGRESS: `${API_BASE}/practice/user-progress`,
  PRACTICE_RUN: `${API_BASE}/practice/run`,
  PRACTICE_SUBMIT: `${API_BASE}/practice/submit`,
  PRACTICE_SUBMISSIONS: `${API_BASE}/practice/submissions`,
  PRACTICE_QUESTION_BY_SLUG: (slug: string) => `${API_BASE}/practice/questions/${slug}`,
  PRACTICE_QUESTION_SOLVE: (id: string) => `${API_BASE}/practice/questions/${id}/solve`,
  PRACTICE_QUESTION_BOOKMARK: (id: string) => `${API_BASE}/practice/questions/${id}/bookmark`,
  PRACTICE_QUESTION_REVISION: (id: string) => `${API_BASE}/practice/questions/${id}/revision`,
  PRACTICE_QUESTION_NOTE: (id: string) => `${API_BASE}/practice/questions/${id}/note`,
  PRACTICE_QUESTION_STATUS: (id: string) => `${API_BASE}/practice/questions/${id}/status`,
  PRACTICE_QUESTION_RUN: (id: string) => `${API_BASE}/practice/questions/${id}/run`,
  PRACTICE_QUESTION_SUBMIT: (id: string) => `${API_BASE}/practice/questions/${id}/submit`,
  PRACTICE_QUESTION_SUBMISSIONS: (id: string) => `${API_BASE}/practice/questions/${id}/submissions`,

  // Algorithms
  ALGORITHMS: `${API_BASE}/algorithms`,
  ALGORITHM_BY_SLUG: (slug: string) => `${API_BASE}/algorithms/${slug}`,
  ALGORITHM_QUIZ: (slug: string) => `${API_BASE}/algorithms/${slug}/quiz`,
  ALGORITHM_PRACTICE: (slug: string) => `${API_BASE}/algorithms/${slug}/practice`,
  ALGORITHM_BOOKMARK: (slug: string) => `${API_BASE}/algorithms/${slug}/bookmark`,
  ALGORITHM_COMPLETE: (slug: string) => `${API_BASE}/algorithms/${slug}/complete`,

  // Quiz
  QUIZ_GENERATE: `${API_BASE}/quiz/generate`,
  QUIZ_ATTEMPT: `${API_BASE}/quiz/attempt`,
  QUIZ_HISTORY: `${API_BASE}/quiz/history`,
  QUIZ_ATTEMPT_BY_ID: (id: string) => `${API_BASE}/quiz/${id}`,

  // Notes & Knowledge Base
  NOTES: `${API_BASE}/notes`,
  NOTE_BY_ID: (id: string) => `${API_BASE}/notes/${id}`,
  NOTE_BOOKMARK: (id: string) => `${API_BASE}/notes/${id}/bookmark`,
  NOTE_COMPLETE: (id: string) => `${API_BASE}/notes/${id}/complete`,
  NOTE_READ_TIME: (id: string) => `${API_BASE}/notes/${id}/read-time`,
  NOTE_PUBLISH: (id: string) => `${API_BASE}/notes/${id}/publish`,
  NOTE_DUPLICATE: (id: string) => `${API_BASE}/notes/${id}/duplicate`,
  NOTE_REORDER: `${API_BASE}/notes/reorder`,
  NOTE_DASHBOARD: `${API_BASE}/notes/dashboard`,

  // Leaderboard
  LEADERBOARD_GLOBAL: `${API_BASE}/leaderboard/global`,
  LEADERBOARD_WEEKLY: `${API_BASE}/leaderboard/weekly`,
  LEADERBOARD_ME: `${API_BASE}/leaderboard/me`,

  // Achievements
  ACHIEVEMENTS: `${API_BASE}/achievements`,
  USER_ACHIEVEMENT_CLAIM: (id: string) => `${API_BASE}/achievements/${id}/claim`,

  // Admin
  ADMIN_OVERVIEW: `${API_BASE}/admin/overview`,
  ADMIN_ANALYTICS: `${API_BASE}/admin/analytics`,
  ADMIN_USERS: `${API_BASE}/admin/users`,
  ADMIN_USER_BY_ID: (id: string) => `${API_BASE}/admin/users/${id}`,
  ADMIN_STUDENTS: `${API_BASE}/admin/students`,
  ADMIN_STUDENT: (id: string) => `${API_BASE}/admin/students/${id}`,
  ADMIN_STUDENT_BAN: (id: string) => `${API_BASE}/admin/students/${id}/ban`,
  ADMIN_STUDENT_RESET_PROGRESS: (id: string) => `${API_BASE}/admin/students/${id}/reset-progress`,
  ADMIN_QUESTIONS: `${API_BASE}/admin/questions`,
  ADMIN_QUESTION_BY_ID: (id: string) => `${API_BASE}/admin/questions/${id}`,
  ADMIN_ALGORITHMS: `${API_BASE}/admin/algorithms`,
  ADMIN_ALGORITHM_BY_ID: (id: string) => `${API_BASE}/admin/algorithms/${id}`,
  ADMIN_QUIZZES: `${API_BASE}/admin/quizzes`,
  ADMIN_QUIZ_BY_ID: (id: string) => `${API_BASE}/admin/quizzes/${id}`,
  ADMIN_CATEGORIES: `${API_BASE}/admin/categories`,
  ADMIN_CATEGORY: (id: string) => `${API_BASE}/admin/categories/${id}`,
  ADMIN_QUIZ_QUESTIONS: `${API_BASE}/admin/quiz-questions`,
  ADMIN_QUIZ_QUESTION: (id: string) => `${API_BASE}/admin/quiz-questions/${id}`,
  ADMIN_AUDIT_LOGS: `${API_BASE}/admin/audit-logs`,
  ADMIN_REPORTS_EXPORT: `${API_BASE}/admin/reports/export`,
  ADMIN_SYSTEM_SETTINGS: `${API_BASE}/admin/settings`,
  ADMIN_STATS: `${API_BASE}/admin/stats`,
};
