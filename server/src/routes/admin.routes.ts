import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { Role } from '@algovisualizer/shared';
import * as AdminController from '../controllers/admin.controller';

const router = Router();

// Protect ALL admin routes with authenticate & authorize(Role.ADMIN)
router.use(authenticate, authorize(Role.ADMIN));

// Overview & System Settings
router.get('/overview', AdminController.getOverview);
router.get('/system-settings', AdminController.getSystemSettings);
router.put('/system-settings', AdminController.updateSystemSettings);

// Student Management
router.get('/students', AdminController.getAllStudents);
router.get('/students/:id', AdminController.getStudentById);
router.put('/students/:id/ban', AdminController.toggleBan);
router.post('/students/:id/reset-password', AdminController.resetStudentPassword);
router.post('/students/:id/grant-badge', AdminController.grantBadge);
router.delete('/students/:id/progress', AdminController.resetProgress);

// Analytics & Audit Logs
router.get('/analytics', AdminController.getAnalytics);
router.get('/analytics/quiz', AdminController.getQuizAnalytics);
router.get('/analytics/activity', AdminController.getActivityAnalytics);
router.get('/audit-logs', AdminController.getAuditLogs);

// Quiz Questions
router.post('/quiz-questions', AdminController.createQuizQuestion);
router.put('/quiz-questions/:id', AdminController.updateQuizQuestion);
router.delete('/quiz-questions/:id', AdminController.deleteQuizQuestion);

// Categories
router.post('/categories', AdminController.createCategory);
router.put('/categories/:id', AdminController.updateCategory);
router.delete('/categories/:id', AdminController.deleteCategory);

// Reports & Data Exports
router.get('/reports/export', AdminController.exportReportData);
router.get('/algorithms/export', AdminController.exportReportData);
router.post('/algorithms/bulk-import', AdminController.bulkImportAlgorithms);

export default router;
