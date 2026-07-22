import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as QuizController from '../controllers/quiz.controller';

const router = Router();

router.use(authenticate);

router.get('/generate', QuizController.generateQuiz);
router.post('/generate', QuizController.generateQuiz);
router.post('/attempt', QuizController.submitAttempt);
router.get('/history', QuizController.getHistory);
router.get('/:attemptId', QuizController.getAttemptById);

export default router;
