import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as AchievementController from '../controllers/achievement.controller';

const router = Router();

router.use(authenticate);

router.get('/', AchievementController.getAll);

export default router;
