import { Router } from "express";
import { executeCtrl } from "../controllers/seed.controller.js";

const router = Router();

router.post('/execute', executeCtrl)

export default router;