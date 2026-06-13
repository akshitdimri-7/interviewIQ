import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import InterviewPage from "./pages/InterviewPage.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
export const ServerUrl = "http://localhost:8000";
import React from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import InterviewHistory from "./pages/INterviewHistory.jsx";
import Pricing from "./pages/Pricing.jsx";
import InterviewReport from "./pages/InterviewReport.jsx";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
        });

        dispatch(setUserData(result.data));

        console.log(result.data);
      } catch (error) {
        // console.log(error);
        console.log(error.response?.data);
        dispatch(setUserData(null));
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/history" element={<InterviewHistory />} />
      <Route path="/report/:id" element={<InterviewReport />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}
