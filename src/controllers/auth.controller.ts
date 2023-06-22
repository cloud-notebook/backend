import express, { Router } from 'express';
import AuthService from "../services/auth.service";

const router: Router = express.Router();

const authService= new AuthService();

router.post("/signup", authService.register);
router.post("/login", authService.login);

export default router;