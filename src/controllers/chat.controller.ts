import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { accessChat, allChats } from "../services/chat.service";

const router = Router();

router.post('/access-chat', authMiddleware, accessChat);

router.get('/all-chats', authMiddleware, allChats);



export default router;