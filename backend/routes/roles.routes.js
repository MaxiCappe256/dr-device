import { Router } from 'express';
import {
  deleteRoleCtrl,
  getRoleCtrl,
  getRolesCtrl,
  updateRoleCtrl,
  createRoleCtrl,
} from '../controllers/roles.controller.js';
import { roleDTO } from '../dtos/role.dtos.js';

const router = Router();

router.get('/', getRolesCtrl);
router.post('/', roleDTO, createRoleCtrl);
router.patch('/:id', roleDTO, updateRoleCtrl);
router.delete('/:id', deleteRoleCtrl);
router.get('/:id', getRoleCtrl);

export default router;
