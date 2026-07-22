import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { uploadSingle } from '../middlewares/upload.middleware';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.put('/settings', UserController.updateProfile);
router.post('/change-password', UserController.changePassword);
router.get('/export-data', UserController.exportUserData);
router.post('/delete-account', UserController.deleteAccount);
router.put('/avatar', uploadSingle, UserController.updateAvatar);
router.post('/avatar', uploadSingle, UserController.updateAvatar);
router.delete('/avatar', UserController.deleteAvatar);

router.get('/progress', UserController.getProgress);
router.get('/bookmarks', UserController.getBookmarks);
router.get('/achievements', UserController.getAchievements);
router.get('/notes', UserController.getNotes);
router.get('/quiz-history', UserController.getQuizHistory);
router.get('/streak', UserController.getStreak);
router.get('/:userId', UserController.getPublicProfile);

export default router;
