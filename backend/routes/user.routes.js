import { Router } from "express";
import { updateUserCtrl, deleteUserCtrl, getMeCtrl, getUsersCtrl } from '../controllers/user.controller.js';
import { userDTO } from "../dtos/user.dtos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { paginationDTO } from "../dtos/pagination.dto.js";

const router = Router();

router.get('/me', authMiddleware, getMeCtrl);
router.get('/', authMiddleware, paginationDTO, getUsersCtrl);
router.patch('/', authMiddleware, userDTO, updateUserCtrl);
router.delete('/', authMiddleware, deleteUserCtrl);

export default router;