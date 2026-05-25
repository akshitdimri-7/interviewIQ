import { Router } from "express";
import { googleAuth, logout } from "../controllers/auth.controller.js";

const autRouter = Router;

authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);

export default authRouter;
