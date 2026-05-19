import { Router } from "express";
import {
  cancelOrderCtrl,
  createOrderCtrl,
  finishOrderCtrl,
  getOrderCtrl,
  getOrdersCtrl,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOrderDTO } from "../dtos/order.dtos.js";

const router = Router();

// TODO: PROTEGER RUTAS

router.post("/", authMiddleware, createOrderDTO, createOrderCtrl);
router.patch("/:id/cancel", authMiddleware, cancelOrderCtrl);
router.patch("/:id/finish", authMiddleware, finishOrderCtrl);
router.get("/", authMiddleware, getOrdersCtrl);
//falta corregir este endpoint, preguntarle a cappe
router.get("/:id", authMiddleware, getOrderCtrl);

export default router;
