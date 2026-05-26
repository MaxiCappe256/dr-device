import { Router } from "express";
import { createOfferCtrl, acceptOfferCtrl } from "../controllers/offers.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOfferDTO } from "../dtos/offers.dto.js";

const router = Router();

router.post("/", authMiddleware, createOfferDTO, createOfferCtrl);
router.put("/:id/accept", authMiddleware, acceptOfferCtrl)

export default router;