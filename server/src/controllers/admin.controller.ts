import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import * as AdminService from '../services/admin.service';
import * as AuditLogService from '../services/auditLog.service';

import * as SystemSettingsService from '../services/systemSettings.service';

export const getOverview = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await AdminService.getOverviewStats();
  sendSuccess({ res, data });
});

export const getSystemSettings = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await SystemSettingsService.getSystemSettings();
  sendSuccess({ res, data });
});

export const updateSystemSettings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await SystemSettingsService.updateSystemSettings(req.body, req.user!._id);
  sendSuccess({ res, message: 'System settings updated successfully', data });
});

export const getAllStudents = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await AdminService.getAllStudents(req.query as Record<string, string>);
  sendSuccess({
    res,
    data: data.students,
    meta: { total: data.total, page: data.page, totalPages: data.totalPages },
  });
});

export const getStudentById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const student = await AdminService.getStudentDetails(req.params.id as string);
  sendSuccess({ res, data: student });
});

export const toggleBan = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await AdminService.toggleBan(req.params.id as string, req.user!._id);
  sendSuccess({ res, message: user.isBanned ? 'User banned' : 'User unbanned', data: user });
});

export const resetStudentPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await AdminService.resetStudentPassword(req.params.id as string, req.user!._id);
  sendSuccess({ res, message: result.message });
});

export const grantBadge = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { badgeTitle } = req.body;
  const result = await AdminService.grantStudentBadge(req.params.id as string, badgeTitle || 'Star Student', req.user!._id);
  sendSuccess({ res, message: result.message });
});

export const resetProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AdminService.resetProgress(req.params.id as string, req.user!._id);
  sendSuccess({ res, message: 'Student progress reset' });
});

export const getAnalytics = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await AdminService.getAnalytics();
  sendSuccess({ res, data });
});

export const getQuizAnalytics = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await AdminService.getQuizAnalytics();
  sendSuccess({ res, data });
});

export const getActivityAnalytics = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const data = await AdminService.getActivityAnalytics();
  sendSuccess({ res, data });
});

export const getAuditLogs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const limit = Number(req.query.limit) || 100;
  const data = await AuditLogService.getAuditLogs(limit);
  sendSuccess({ res, data });
});

export const createQuizQuestion = asyncHandler(async (req: AuthRequest, res: Response) => {
  const question = await AdminService.createQuizQuestion(req.body, req.user!._id);
  sendSuccess({ res, statusCode: 201, message: 'Question created', data: question });
});

export const updateQuizQuestion = asyncHandler(async (req: AuthRequest, res: Response) => {
  const question = await AdminService.updateQuizQuestion(req.params.id as string, req.body, req.user!._id);
  sendSuccess({ res, message: 'Question updated', data: question });
});

export const deleteQuizQuestion = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AdminService.deleteQuizQuestion(req.params.id as string, req.user!._id);
  sendSuccess({ res, message: 'Question deleted' });
});

export const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await AdminService.createCategory(req.body, req.user!._id);
  sendSuccess({ res, statusCode: 201, message: 'Category created', data: category });
});

export const updateCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const category = await AdminService.updateCategory(req.params.id as string, req.body, req.user!._id);
  sendSuccess({ res, message: 'Category updated', data: category });
});

export const deleteCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  await AdminService.deleteCategory(req.params.id as string, req.user!._id);
  sendSuccess({ res, message: 'Category deleted' });
});

export const exportReportData = asyncHandler(async (req: AuthRequest, res: Response) => {
  const type = (req.query.type as any) || 'students';
  const format = (req.query.format as string) === 'json' ? 'json' : 'csv';
  const data = await AdminService.exportReportData(type, format);

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${type}_report.csv`);
    return res.status(200).send(data);
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=${type}_report.json`);
  return res.status(200).send(data);
});

export const bulkImportAlgorithms = asyncHandler(async (req: AuthRequest, res: Response) => {
  const items = Array.isArray(req.body) ? req.body : [req.body];
  const result = await AdminService.bulkImportAlgorithms(items, req.user!._id);
  sendSuccess({ res, message: `Successfully imported ${result.importedCount} algorithms`, data: result });
});
