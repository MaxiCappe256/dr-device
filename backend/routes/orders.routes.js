import { Router } from "express";
import {
  cancelOrderCtrl,
  createOrderCtrl,
  finishOrderCtrl,
  getAvailableOrdersCtrl,
  getOrderCtrl,
  getOrdersByUserCtrl,
  getOrdersCtrl,
  getOrdersByTechnicianCtrl
} from "../controllers/order.controller.js";
import { getOffersPerOrderCtrl } from "../controllers/offers.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOrderDTO } from "../dtos/order.dtos.js";

const router = Router();

// TODO: PROTEGER RUTAS

router.get("/", authMiddleware, getOrdersCtrl);
router.post("/", authMiddleware, createOrderDTO, createOrderCtrl);
router.get('/own', authMiddleware, getOrdersByUserCtrl);
router.get('/tech', authMiddleware, getOrdersByTechnicianCtrl);
router.get("/available", authMiddleware, getAvailableOrdersCtrl);
router.get("/:id", authMiddleware, getOrderCtrl);
router.get('/:id/offers', authMiddleware, getOffersPerOrderCtrl);
router.patch("/:id/cancel", authMiddleware, cancelOrderCtrl);
router.patch("/:id/finish", authMiddleware, finishOrderCtrl);


export default router;  