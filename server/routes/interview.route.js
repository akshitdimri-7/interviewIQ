import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { analyzeResume } from "../controllers/interview.controller.js";

const interviewRouter = Router();

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);

export default interviewRouter;
