import { Router } from 'express';
import {
  createPermissionCtrl,
  deletePermissionCtrl,
  getPermissionCtrl,
  getPermissionsCtrl,
  updatePermissionCtrl,
} from '../controllers/permission.controller.js';
import { permissionDTO } from '../dtos/permission.dtos.js';

const router = Router();

router.get('/', getPermissionsCtrl);
router.post('/', permissionDTO, createPermissionCtrl);
router.patch('/:id', permissionDTO, updatePermissionCtrl);
router.delete('/:id', deletePermissionCtrl);
router.get('/:id', getPermissionCtrl);

export default router;
