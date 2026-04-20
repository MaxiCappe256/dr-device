import { Router } from "express";
import {
    registerCtrl, 
    loginCtrl, 
    logoutCtrl
} from '../controllers/auth.controller.js';
import { registerDTO } from "../dtos/auth.dtos.js";
const router = Router();

router.post('/register', registerDTO, registerCtrl);
router.post('/login', loginCtrl);
router.post('/logout', logoutCtrl);

export default router;