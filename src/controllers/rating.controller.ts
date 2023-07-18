import { Router } from "express";
import { RatingService } from "../services/rating.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const ratingService = new RatingService();



router.post('/add', authMiddleware, ratingService.addRating);

router.get('/:noteId', ratingService.getRating);

router.delete('/delete/:noteId', ratingService.deleteRating);




export default router;