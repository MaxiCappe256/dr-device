import { Router } from "express";
import { createOfferCtrl, acceptOfferCtrl, getOfferCtrl, allOffersTechCtrl, cancelOfferTechCtrl } from "../controllers/offers.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOfferDTO } from "../dtos/offers.dto.js";

const router = Router();

router.get("/tech",authMiddleware,allOffersTechCtrl)
router.post("/", authMiddleware, createOfferDTO, createOfferCtrl);
router.get("/:id", authMiddleware, getOfferCtrl);
router.put("/:id/accept", authMiddleware, acceptOfferCtrl)
router.put('/:id/tech-cancel', authMiddleware, cancelOfferTechCtrl)


export default router;