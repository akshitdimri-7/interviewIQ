import React from "react";
import malevideo from "../assets/Videos/male-ai.mp4";
import femalevideo from "../assets/Videos/female-ai.mp4";
import Timer from "../components/Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useRef } from "react";

function Step2Interview({ interviewData, onFinish }) {
  const { intervieId, questions, userName } = interviewData;
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* video section */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video
              src={femalevideo}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* subtitle pending */}

          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interview Status</span>
              <span className="text-sm font-semibold text-emerald-600">
                Ai Speaking...
              </span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-center">
              <Timer timeLeft="30" totalTime="60" />
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="grid-grid-col-2 gap-6 text-center">
              <div>
                <span className="text-2xl font-bold text-emerald-600">1</span>
                <span className="text-xs text-gray-400">current ques</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-emerald-600">5</span>
                <span className="text-xs text-gray-400">total ques</span>
              </div>
            </div>
          </div>
        </div>
        {/* text section */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-600 mg-6">
            Ai Smart Interview
          </h2>
          <div className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-400 mg-2">
              Question 1 of 5
            </p>
            <div className="text-base sm:text-lg font-semibold text-gray-800 leading-0">
              {" "}
              First Question
            </div>

            <textarea
              placeholder="type your answer here"
              name=""
              id=""
              className="flex-1 bg-gray-100 p-4 sm:p-6 riunded-2xl resize-none outline-none border border-gray-200 focus-ring-2 focus:ring-emerald-500 transition text-gray-800"
            ></textarea>
            <div className="flex items-center gap-4 mt-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 sm-w-14 sm-h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg"
              >
                <FaMicrophone size={20} />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex-1 bg-linear-to-r from-emerald-600 to to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold"
                >
                  Submit Answer
                </motion.button>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
