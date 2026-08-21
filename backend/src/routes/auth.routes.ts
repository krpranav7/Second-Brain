import { Router } from "express";
import { addContent, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";

const router: Router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/logout', logoutUser);
router .post('/content', addContent);

export {router as authRoutes};