import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as NoteController from '../controllers/note.controller';

const router = Router();

router.use(authenticate);

router.get('/', NoteController.getAll);
router.post('/', NoteController.create);
router.put('/:id', NoteController.update);
router.delete('/:id', NoteController.remove);
router.put('/:id/bookmark', NoteController.toggleBookmark);

export default router;
