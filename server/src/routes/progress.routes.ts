import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as ProgressController from '../controllers/progress.controller';

const router = Router();

router.use(authenticate);

router.get('/summary', ProgressController.getSummary);
router.get('/recent', ProgressController.getRecentActivity);
router.get('/dashboard-full', ProgressController.getDashboardFullStats);
router.get('/', ProgressController.getAll);

export default router;

