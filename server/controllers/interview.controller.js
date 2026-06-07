import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

export const analyzeResume = async (req, res) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume required.",
      });
    }

    filePath = req.file.path;

    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({
      data: uint8Array,
    }).promise;

    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `
Extract structured data from the resume.

Return ONLY valid JSON in the following format:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}

Do not return markdown.
Do not return explanations.
Return only JSON.
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi({ messages });

    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedResponse);

    return res.status(200).json({
      success: true,
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects || [],
      skills: parsed.skills || [],
      resumeText,
    });
  } catch (error) {
    console.log("Resume Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.log("File Cleanup Error:", err);
    }
  }
};

export const generateQuestion = async (req, res) => {
  try {
    const { role, experience, mode, resumeText, projects, skills } = req.body;

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res
        .status(400)
        .json({ message: "role, mode, and experience are required." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: "Not enough credits. Minimum credits needed are 50.",
      });
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `Role:${role}
    Experience:${experience}
    InterviewMode:${mode}
    Projects:${projectText}
    Skills:${skillsText}
    Resume:${safeResume}`;

    if (!userPrompt.trim()) {
      return res.status(400).json({ message: "Prompt is empty." });
    }

    const messages = [
      {
        role: "system",
        content: `
                  You are a real human interviewer conducting a professional interview.

                  Speak in simple, natural English as if you are directly talking to the candidate.

                  Generate exactly 5 interview questions.

                  Strict Rules:
                  - Each question must contain between 15 and 25 words.
                  - Each question must be a single complete sentence.
                  - Do NOT number them.
                  - Do NOT add explanations.
                  - Do NOT add extra text before or after.
                  - One question per line only.
                  - Keep language simple and conversational.
                  - Questions must feel practical and realistic.

                  Difficulty progression:
                  Question 1 → easy  
                  Question 2 → easy  
                  Question 3 → medium  
                  Question 4 → medium  
                  Question 5 → hard  

                  Make questions based on the candidate’s role, experience,interviewMode, projects, skills, and resume details.
                  `,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAi(messages);

    if (!aiResponse || !aiResponse.trim()) {
      return res.status(500).json({
        message: "AI returned empty response.",
      });
    }

    const questionsArray = aiResponse
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .slice(0, 5);

    if (questionsArray.length === 0) {
      return res.status(500).json({
        message: "AI failed to generate questions.",
      });
    }

    user.credits -= 50;
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionsArray.map((q, index) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
        timeLimit: [60, 60, 90, 90, 120][index],
      })),
    });
  } catch (error) {}
};
