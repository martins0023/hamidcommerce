import React from "react";
import { Ellipse, EllipseSelected, illustration2, illustration3 } from "../assets";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import MyButton from "../components/reusable/MyButton";
import { useNavigate } from "react-router-dom";

const GetStarted3 = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/login");
  };

  const containerVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50, staggerChildren: 0.3 },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };
  return (
    <section className="bg-white h-screen w-screen flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center justify-items-center">
        <motion.div
          variants={containerVariants}
          animate="visible"
          initial="hidden"
          exit="exit"
          className="flex-[0.75] rounded-2xl overflow-hidden max-w-sm"
        >
          <div className="flex flex-col items-center justify-items-center">
            <img
              src={illustration3}
              alt="shopping illustration"
              className="w-[295px] h-[275px]"
            />

            <p className="text-original w-[314px] h-[54px] mt-20 text-center text-[18px] font-semibold">
              Life is hard enough already. Let us make it a little easier
            </p>
          </div>
          <div className="flex flex-col mt-20 mb-0">
            <div className="flex flex-row gap-1 items-center justify-center">
              <img src={Ellipse} className="w-[7px] h-[7px]" />
              <img src={Ellipse} className="w-[7px] h-[7px]" />
              <img src={EllipseSelected} className="w-[7px] h-[7px]" />
            </div>
            <MyButton onClick={handleNextPage} buttonText="Continue!" />
          </div>
          <div className="mt-5 mb-3">
            <p className="text-[#353945] font-normal text-[12px] text-center">
              Already have an account?{" "}
              <span className="text-[#FE8946] font-semibold text-[14px]">
                {" "}
                <a href="/login"> Log In</a>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted3;
