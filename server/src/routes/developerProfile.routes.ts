import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { Role } from '@algovisualizer/shared';
import * as DeveloperProfileController from '../controllers/developerProfile.controller';

const router = Router();

// Public / User GET Endpoints
router.get('/', DeveloperProfileController.getProfile);
router.get('/public', DeveloperProfileController.getProfile);

// Admin-Only Write Endpoints (Strict RBAC protection)
router.put('/', authenticate, authorize(Role.ADMIN), DeveloperProfileController.updateProfile);
router.patch('/', authenticate, authorize(Role.ADMIN), DeveloperProfileController.updateProfile);
router.post('/photo', authenticate, authorize(Role.ADMIN), DeveloperProfileController.uploadPhoto);
router.post('/resume', authenticate, authorize(Role.ADMIN), DeveloperProfileController.uploadResume);
router.delete('/photo', authenticate, authorize(Role.ADMIN), DeveloperProfileController.deletePhoto);
router.delete('/resume', authenticate, authorize(Role.ADMIN), DeveloperProfileController.deleteResume);

export default router;
