import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '@algovisualizer/shared';
import * as LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.use(authenticate);

router.get('/', LeaderboardController.getLeaderboard);
router.get('/global', LeaderboardController.getLeaderboard);
router.get('/weekly', LeaderboardController.getLeaderboard);
router.get('/monthly', LeaderboardController.getLeaderboard);
router.get('/me', LeaderboardController.getMyRank);
router.get('/profile/:userId', LeaderboardController.getUserProfile);
router.get('/config', LeaderboardController.getXPConfig);

// Admin-only endpoints
router.put('/config', authorize(Role.ADMIN), LeaderboardController.updateXPConfig);
router.post('/recalculate', authorize(Role.ADMIN), LeaderboardController.recalculateRanks);

export default router;
