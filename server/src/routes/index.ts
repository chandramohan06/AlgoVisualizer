import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import algorithmRoutes from './algorithm.routes';
import quizRoutes from './quiz.routes';
import noteRoutes from './note.routes';
import leaderboardRoutes from './leaderboard.routes';
import achievementRoutes from './achievement.routes';
import progressRoutes from './progress.routes';
import adminRoutes from './admin.routes';
import practiceRoutes from './practice.routes';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/algorithms', algorithmRoutes);
router.use('/algorithm', algorithmRoutes);
router.use('/quiz', quizRoutes);
router.use('/practice', practiceRoutes);
router.use('/notes', noteRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/achievements', achievementRoutes);
router.use('/progress', progressRoutes);
router.use('/admin', adminRoutes);
