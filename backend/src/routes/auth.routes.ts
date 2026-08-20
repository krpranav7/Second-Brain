import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";

const router: Router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/logout', logoutUser);

export {router as authRoutes};