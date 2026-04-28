import { Router } from 'express';
import {
  deleteRoleCtrl,
  getRoleCtrl,
  getRolesCtrl,
  updateRoleCtrl,
  createRoleCtrl,
} from '../controllers/roles.controller.js';
import { createRoleDTO, updateRoleDTO } from '../dtos/role.dtos.js';

const router = Router();

router.get('/', getRolesCtrl);
router.post('/', createRoleDTO, createRoleCtrl);
router.patch('/:id', updateRoleDTO, updateRoleCtrl);
router.delete('/:id', deleteRoleCtrl);
router.get('/:id', getRoleCtrl); 

export default router;
