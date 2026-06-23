import { Router } from "express";
import { createOfferCtrl, acceptOfferCtrl, getOfferCtrl, allOffersTechCtrl, cancelOfferTechCtrl } from "../controllers/offers.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOfferDTO } from "../dtos/offers.dto.js";
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { OFFER } = PERMISSIONS_LIST;

const router = Router();

router.get("/tech", authMiddleware, validateAccessMiddleware([OFFER.LIST_READ]), allOffersTechCtrl)
router.post("/", authMiddleware, validateAccessMiddleware([OFFER.CREATE]), createOfferDTO, createOfferCtrl);
router.get("/:id", authMiddleware, validateAccessMiddleware([OFFER.READ]), getOfferCtrl);
router.put("/:id/accept", authMiddleware, validateAccessMiddleware([OFFER.ACCEPT]), acceptOfferCtrl)
router.put('/:id/tech-cancel', authMiddleware, validateAccessMiddleware([OFFER.CANCEL]), cancelOfferTechCtrl)


export default router;