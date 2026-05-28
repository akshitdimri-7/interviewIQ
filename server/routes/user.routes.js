import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";
const userRouter = Router;

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.post("/logout");

export default userRouter;
