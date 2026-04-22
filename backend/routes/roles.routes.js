import { Router } from 'express';
import { deleteRoleCtrl, getRoleCtrl, getRolesCtrl, updateRoleCtrl, createRoleCtrl } from '../controllers/roles.controller.js';

const router = Router();

router.get('/', getRolesCtrl);
router.post('/', createRoleCtrl);
router.patch('/:id', updateRoleCtrl);
router.delete('/:id', deleteRoleCtrl);
router.get('/:id', getRoleCtrl);

export default router;
