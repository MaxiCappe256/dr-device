import { Router } from "express";
import {
  createSpecializationCtrl,
  updateSpecializationCtrl,
} from "../controllers/specializations.controller.js";
import { specializationsDTO } from "../dtos/specializations.dtos.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { SPECIALIZATION } = PERMISSIONS_LIST;

const router = Router();

router.post("/", authMiddleware, validateAccessMiddleware([SPECIALIZATION.CREATE]), specializationsDTO, createSpecializationCtrl);
router.patch("/", authMiddleware, validateAccessMiddleware([SPECIALIZATION.UPDATE]), specializationsDTO, updateSpecializationCtrl);

export default router;
