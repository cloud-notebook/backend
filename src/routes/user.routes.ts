import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const router: Router = express.Router();

const userController: UserController = new UserController();

router.post("/signup", userController.register);
// router.post("/login");

export default router;