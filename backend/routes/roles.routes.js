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
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { ROLE } = PERMISSIONS_LIST;

const router = Router();

router.get('/public', getPublicRolesCtrl);
router.get('/', authMiddleware, validateAccessMiddleware([ROLE.LIST_READ]), getRolesCtrl);
router.post('/', authMiddleware, validateAccessMiddleware([ROLE.CREATE]), createRoleDTO, createRoleCtrl);
router.patch('/:id', authMiddleware, validateAccessMiddleware([ROLE.UPDATE]), updateRoleDTO, updateRoleCtrl);
router.delete('/:id', authMiddleware, validateAccessMiddleware([ROLE.DELETE]), deleteRoleCtrl);
router.get('/:id', authMiddleware, validateAccessMiddleware([ROLE.READ]),  getRoleCtrl);

export default router;
