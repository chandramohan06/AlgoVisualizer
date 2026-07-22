import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { Role } from '@algovisualizer/shared';
import * as AlgorithmController from '../controllers/algorithm.controller';

const router = Router();

router.use(authenticate);

router.get('/', AlgorithmController.getAll);
router.get('/:slug', AlgorithmController.getBySlug);
router.get('/:slug/quiz', AlgorithmController.getQuizQuestions);
router.get('/:slug/practice', AlgorithmController.getPracticeProblems);
router.post('/:slug/bookmark', AlgorithmController.toggleBookmark);
router.post('/:slug/complete', AlgorithmController.markComplete);

// Admin only
router.post('/', authorize(Role.ADMIN), AlgorithmController.create);
router.put('/:id', authorize(Role.ADMIN), AlgorithmController.update);
router.delete('/:id', authorize(Role.ADMIN), AlgorithmController.remove);

export default router;
