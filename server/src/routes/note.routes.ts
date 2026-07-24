import { Router } from 'express';
import { authenticate, optionalAuthenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '@algovisualizer/shared';
import * as NoteController from '../controllers/note.controller';

const router = Router();

// Public / Student Read Routes (Optional Auth for bookmark state)
router.get('/', optionalAuthenticate, NoteController.getAll);
router.get('/dashboard', authenticate, NoteController.getDashboardNotes);
router.get('/:idOrSlug', optionalAuthenticate, NoteController.getBySlugOrId);

// User Interaction Routes (Require Auth)
router.post('/:id/bookmark', authenticate, NoteController.toggleBookmark);
router.post('/:id/complete', authenticate, NoteController.toggleComplete);
router.post('/:id/read-time', authenticate, NoteController.recordReadTime);

// Admin CMS Protected Routes
router.post('/', authorize(Role.ADMIN), NoteController.create);
router.put('/reorder', authorize(Role.ADMIN), NoteController.reorder);
router.put('/:id', authorize(Role.ADMIN), NoteController.update);
router.delete('/:id', authorize(Role.ADMIN), NoteController.remove);
router.put('/:id/publish', authorize(Role.ADMIN), NoteController.togglePublish);
router.post('/:id/duplicate', authorize(Role.ADMIN), NoteController.duplicate);

export default router;
