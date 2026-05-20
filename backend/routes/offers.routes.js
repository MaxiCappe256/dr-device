import { Router } from "express";
import { createOfferCtrl, getOffersPerOrderCtrl } from "../controllers/offers.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOfferDTO } from "../dtos/offers.dto.js";

const router = Router();

router.post("/", authMiddleware, createOfferDTO, createOfferCtrl);
router.get('/orders/:id', authMiddleware, getOffersPerOrderCtrl)

export default router;



