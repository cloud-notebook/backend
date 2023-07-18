import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { getProfile } from '../services/user.service';

const router = express.Router();


router.get("/profile", authMiddleware, getProfile)


export default router;





