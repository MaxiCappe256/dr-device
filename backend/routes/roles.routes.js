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
import { validateAccessMiddleware } from '../middlewares/guard.middleware.js';

const router = Router();

router.get('/', authMiddleware, validateAccessMiddleware([]), getRolesCtrl);
router.post('/', authMiddleware, validateAccessMiddleware(['order:cancel']), createRoleDTO, createRoleCtrl);
router.patch('/:id', authMiddleware, validateAccessMiddleware(['order:cacel']), updateRoleDTO, updateRoleCtrl);
router.delete('/:id', authMiddleware, deleteRoleCtrl);
router.get('/:id', authMiddleware, getRoleCtrl);

export default router;
