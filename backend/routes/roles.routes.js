import { Router } from 'express';
import {
  deleteRoleCtrl,
  getRoleCtrl,
  getRolesCtrl,
  updateRoleCtrl,
  createRoleCtrl,
  getPublicRolesCtrl
} from '../controllers/roles.controller.js';
import { createRoleDTO, updateRoleDTO } from '../dtos/role.dtos.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateAccessMiddleware } from '../middlewares/guard.middleware.js';
import { PERMISSIONS_LIST } from '../constants/permissions.js';

const router = Router();

router.get('/public', getPublicRolesCtrl);
router.get('/', authMiddleware, getRolesCtrl);
router.post('/', authMiddleware, validateAccessMiddleware([PERMISSIONS_LIST.ORDER.CREATE]), createRoleDTO, createRoleCtrl);
router.patch('/:id', authMiddleware, validateAccessMiddleware([PERMISSIONS_LIST.ORDER.UPDATE]), updateRoleDTO, updateRoleCtrl);
router.delete(
  '/:id', 
  authMiddleware, 
  validateAccessMiddleware([
    PERMISSIONS_LIST.ORDER.DELETE,
  ]), 
  deleteRoleCtrl
);
router.get('/:id', authMiddleware, getRoleCtrl);

export default router;
