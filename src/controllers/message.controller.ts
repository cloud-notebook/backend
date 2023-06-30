import { Router } from 'express'
import authMiddleware from "../middleware/auth.middleware";
import { deleteMessage, getAllMessages, sendMessage } from '../services/message.service';


const router = Router()

router.post('/send', authMiddleware, sendMessage);
router.get('/all-messages/:chatId', authMiddleware, getAllMessages);
router.delete('/delete-message/:messageId', authMiddleware, deleteMessage);


export default router