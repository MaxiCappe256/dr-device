import { Router } from 'express';
import {
  deleteRoleCtrl,
  getRoleCtrl,
  getRolesCtrl,
  updateRoleCtrl,
  createRoleCtrl,
} from '../controllers/roles.controller.js';
import { createRoleDTO, updateRoleDTO } from '../dtos/role.dtos.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getRolesCtrl);
router.post('/', authMiddleware, createRoleDTO, createRoleCtrl);
router.patch('/:id', authMiddleware, updateRoleDTO, updateRoleCtrl);
router.delete('/:id', authMiddleware, deleteRoleCtrl);
router.get('/:id', authMiddleware, getRoleCtrl);

export default router;
