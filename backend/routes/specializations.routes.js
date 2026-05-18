import { Router } from 'express';
import {
  createSpecializationCtrl,
  updateSpecializationCtrl,
} from '../controllers/specializations.controller.js';
import { specializationsDTO } from '../dtos/specializations.dtos.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, specializationsDTO, createSpecializationCtrl);
router.put('/', authMiddleware, specializationsDTO, updateSpecializationCtrl);

export default router;