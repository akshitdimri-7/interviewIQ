import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";

const InterviewHistory = () => {
  const [intervies, setInterviews] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/get-intrview",
          {
            withCredentials: true,
          },
        );

        setInterviews(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyInterviews();
  }, []);
  return (<div>
    
  </div>);
};

export default InterviewHistory;
