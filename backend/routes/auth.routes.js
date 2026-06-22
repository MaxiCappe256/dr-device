import { Router } from "express";
import { registerCtrl, loginCtrl, changePasswordCtrl, logoutCtrl } from '../controllers/auth.controller.js';
import { registerDTO, loginDTO, changePasswordDTO } from "../dtos/auth.dtos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', registerDTO, registerCtrl);
router.post('/login', loginDTO, loginCtrl);
router.post('/logout', authMiddleware, logoutCtrl);
router.patch('/change-password', authMiddleware, changePasswordDTO, changePasswordCtrl);

export default router;