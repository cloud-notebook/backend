import { Router } from "express";
import { NoteService } from "../services/note.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const noteService = new NoteService();

router.get('/public', noteService.publicNote);
router.post('/create', authMiddleware, noteService.addNote);
router.get('/all', authMiddleware, noteService.getNotes);
router.get('/:id', authMiddleware, noteService.getNote);
router.put('/update/:id', authMiddleware, noteService.updateNote);
router.delete('/delete/:id', authMiddleware, noteService.deleteNote);
router.get('/search', authMiddleware, noteService.searchNote);




export default router;