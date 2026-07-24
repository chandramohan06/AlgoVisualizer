import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '@algovisualizer/shared';
import * as NoteController from '../controllers/note.controller';

const router = Router();

// Require authentication for note interactions
router.use(authenticate);

// Student & Common Routes
router.get('/', NoteController.getAll);
router.get('/dashboard', NoteController.getDashboardNotes);
router.get('/:idOrSlug', NoteController.getBySlugOrId);
router.post('/:id/bookmark', NoteController.toggleBookmark);
router.post('/:id/complete', NoteController.toggleComplete);
router.post('/:id/read-time', NoteController.recordReadTime);

// Admin CMS Protected Routes
router.post('/', authorize(Role.ADMIN), NoteController.create);
router.put('/reorder', authorize(Role.ADMIN), NoteController.reorder);
router.put('/:id', authorize(Role.ADMIN), NoteController.update);
router.delete('/:id', authorize(Role.ADMIN), NoteController.remove);
router.put('/:id/publish', authorize(Role.ADMIN), NoteController.togglePublish);
router.post('/:id/duplicate', authorize(Role.ADMIN), NoteController.duplicate);

export default router;
