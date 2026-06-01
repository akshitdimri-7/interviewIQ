import React from "react";
import { motion } from "motion/react";
const Step1Setup = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-grdient-to-br from-gray-100 to-gray-200 px-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className=" relative items-center bg-grdient-to-br from-green-100 to-gren-200 p-12 flex flex-col justify-center"
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Step1Setup;
