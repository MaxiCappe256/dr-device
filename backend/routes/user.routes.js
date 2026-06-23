import { Router } from "express";
import { updateUserCtrl, deleteUserCtrl, getUserCtrl, getMeCtrl, getUsersCtrl, deleteUserByIdCtrl, createAdminCtrl } from '../controllers/user.controller.js';
import { userDTO, userByIdDTO } from "../dtos/user.dtos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { paginationDTO } from "../dtos/pagination.dto.js";
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { USER, ADMIN } = PERMISSIONS_LIST;

const router = Router();

router.get('/me', authMiddleware, getMeCtrl);
router.get('/', authMiddleware, validateAccessMiddleware([USER.LIST_READ]), paginationDTO, getUsersCtrl);
router.get('/:id', authMiddleware, userByIdDTO, getUserCtrl);
router.patch('/', authMiddleware, validateAccessMiddleware([USER.UPDATE]), userDTO, updateUserCtrl);
router.delete('/', authMiddleware, deleteUserCtrl);
router.delete('/:id', authMiddleware, validateAccessMiddleware([USER.DELETE]), deleteUserByIdCtrl);
router.post('/admin', authMiddleware, validateAccessMiddleware([ADMIN.CREATE]), createAdminCtrl);

export default router;