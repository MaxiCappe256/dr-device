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
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { ORDER, OFFER } = PERMISSIONS_LIST;

const router = Router();

// TODO: PROTEGER RUTAS

router.get("/", authMiddleware, validateAccessMiddleware([ORDER.LIST_READ]), getOrdersCtrl);
router.post("/", authMiddleware, validateAccessMiddleware([ORDER.CREATE]), createOrderDTO, createOrderCtrl);
router.get('/own', authMiddleware, getOrdersByUserCtrl);
router.get('/tech', authMiddleware, getOrdersByTechnicianCtrl);
router.get("/available", authMiddleware, getAvailableOrdersCtrl);
router.get("/:id", authMiddleware, validateAccessMiddleware([ORDER.READ]), getOrderCtrl);
router.get('/:id/offers', authMiddleware, validateAccessMiddleware([OFFER.READ]), getOffersPerOrderCtrl);
router.patch("/:id/cancel", authMiddleware, validateAccessMiddleware([ORDER.CANCEL]), cancelOrderCtrl);
router.patch("/:id/finish", authMiddleware, validateAccessMiddleware([ORDER.FINISH]), finishOrderCtrl);


export default router;  