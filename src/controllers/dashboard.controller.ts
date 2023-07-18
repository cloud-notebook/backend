import { Router } from "express";
import { DashboardService } from "../services/dashboard.service";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
const dashboardService = new DashboardService();

router.get('/statics', authMiddleware, dashboardService.userStatics);




export default router;