import { Router } from "express";
import { getUserCtrl, updateUserCtrl, deleteCtrl } from '../controllers/user.controller.js';
import { userDTO } from "../dtos/user.dtos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/user', authMiddleware, getUserCtrl);
router.patch('/user', authMiddleware, userDTO, updateUserCtrl);
router.delete('/user', authMiddleware, deleteCtrl);

export default router;