import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as PracticeController from '../controllers/practice.controller';

const router = Router();

router.use(authenticate);

// Public Practice Problem APIs
router.get('/questions', PracticeController.getQuestions);
router.get('/questions/:id', PracticeController.getQuestionById);
router.get('/user-progress', PracticeController.getUserProgress);

router.post('/run', PracticeController.runCode);
router.post('/submit', PracticeController.submitCode);
router.get('/submissions', PracticeController.getSubmissions);

// Also preserve legacy sub-paths for backwards compatibility
router.post('/questions/:id/run', PracticeController.runCode);
router.post('/questions/:id/submit', PracticeController.submitCode);
router.get('/questions/:id/submissions', PracticeController.getSubmissions);
router.post('/questions/:id/bookmark', PracticeController.toggleBookmark);
router.post('/questions/:id/status', PracticeController.updateQuestionStatus);
router.post('/questions/:id/note', PracticeController.saveNote);

export default router;
