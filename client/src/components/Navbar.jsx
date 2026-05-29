import React from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsRobot, BsCoin } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#f3f3f3] flex justify-center px-4 pt-6"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>

          <h1 className="font-semibold hidden md:block text-lg">
            interviewIQ.AI
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition">
            <BsCoin size={20} />
            {userData?.credits || 0}
          </button>

          <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
            {userData?.name ? (
              userData.name.charAt(0).toUpperCase()
            ) : (
              <FaUserAstronaut size={16} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
