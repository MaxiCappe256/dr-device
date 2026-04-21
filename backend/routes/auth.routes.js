import { Router } from "express";
import {
    registerCtrl, 
    loginCtrl, 
    logoutCtrl
} from '../controllers/auth.controller.js';
import { registerDTO, loginDTO } from "../dtos/auth.dtos.js";
const router = Router();

router.post('/register', registerDTO, registerCtrl);
// ? Debe existir login (token), hacer middleware
router.post('/login', loginDTO, loginCtrl);
router.post('/logout', logoutCtrl);

export default router;