import { Router } from 'express';
import { createOrderCtrl } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createOrderDTO } from '../dtos/order.dtos.js';

const router = Router();

router.post('/', authMiddleware, createOrderDTO, createOrderCtrl);

export default router;