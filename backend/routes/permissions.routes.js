import { Router } from 'express';
import { createPermissionCtrl, deletePermissionCtrl, getPermissionCtrl, getPermissionsCtrl, updatePermissionCtrl } from '../controllers/permission.controller.js';
import { permissionDTO } from '../dtos/permission.dtos.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { PERMISSION } = PERMISSIONS_LIST;

const router = Router();

router.get('/', authMiddleware, validateAccessMiddleware([PERMISSION.LIST_READ]), getPermissionsCtrl);
router.post('/', authMiddleware, validateAccessMiddleware([PERMISSION.CREATE]), permissionDTO, createPermissionCtrl);
router.get('/:id', authMiddleware, validateAccessMiddleware([PERMISSION.READ]), getPermissionCtrl);
router.patch('/:id', authMiddleware, validateAccessMiddleware([PERMISSION.UPDATE]), permissionDTO, updatePermissionCtrl);
router.delete('/:id', authMiddleware, validateAccessMiddleware([PERMISSION.DELETE]), deletePermissionCtrl);

export default router;
