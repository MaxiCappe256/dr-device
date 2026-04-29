import { Router } from 'express';
import { createPermissionCtrl, deletePermissionCtrl, getPermissionCtrl, getPermissionsCtrl, updatePermissionCtrl } from '../controllers/permission.controller.js';
import { permissionDTO } from '../dtos/permission.dtos.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getPermissionsCtrl);
router.get('/:id', authMiddleware, getPermissionCtrl);
router.post('/', authMiddleware, permissionDTO, createPermissionCtrl);
router.patch('/:id', authMiddleware, permissionDTO, updatePermissionCtrl);
router.delete('/:id', authMiddleware, deletePermissionCtrl);

export default router;
