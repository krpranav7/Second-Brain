import { Router } from "express";
import { addContent, deleteContent, getContents, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/logout', logoutUser);
router.post('/content', authUserMiddleware, addContent);
router.get('/content', authUserMiddleware, getContents);
router.delete('/content', authUserMiddleware, deleteContent);

export {router as authRoutes};