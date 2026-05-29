import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
export const ServerUrl = "http://localhost:8000";

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
    </Routes>
  );
}
