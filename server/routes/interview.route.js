import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  analyzeResume,
  finishInterview,
  generateQuestion,
  gertInterviewReport,
  getMyInterview,
  submitAnswer,
} from "../controllers/interview.controller.js";

const interviewRouter = Router();

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);
interviewRouter.post("/generate-questions", isAuth, generateQuestion);
interviewRouter.post("/submit-answer", isAuth, submitAnswer);
interviewRouter.post("/finish", isAuth, finishInterview);

interviewRouter.get("/get-interview", isAuth, getMyInterview);
interviewRouter.get("/report/:id", isAuth, gertInterviewReport);

export default interviewRouter;
