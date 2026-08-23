import { Router } from "express";
import { addContent, deleteContent, getContents, getSharedBrain, loginUser, logoutUser, registerUser, shareBrain } from "../controllers/auth.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/logout', logoutUser);
router.post('/content', authUserMiddleware, addContent);
router.get('/content', authUserMiddleware, getContents);
router.delete('/content', authUserMiddleware, deleteContent);
router.post('/brain/share', authUserMiddleware, shareBrain);
router.get('/brain/:shareLink', getSharedBrain);

export {router as authRoutes};