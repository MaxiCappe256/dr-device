import { Router } from "express";
import { registerCtrl, loginCtrl, logoutCtrl } from '../controllers/auth.controller.js';
import { registerDTO, loginDTO } from "../dtos/auth.dtos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', registerDTO, registerCtrl);
router.post('/login', loginDTO, loginCtrl);
router.post('/logout', authMiddleware, logoutCtrl);

export default router;