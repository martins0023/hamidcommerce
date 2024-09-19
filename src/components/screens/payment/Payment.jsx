import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../styles";
import {
  back_icon,
  callcart,
  cart,
  cartnone,
  circle_check,
  circle_check_outline,
  locationcart,
} from "../../../assets";

const Payment = () => {
  const navigate = useNavigate();

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
    <section className="bg-[#FBFCFF]">
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <nav
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20 `}
        >
          <div className="flex items-center w-full px-3">
            <Link
              to=""
              onClick={() => {
                navigate(-1);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={back_icon}
                alt="back"
                className="cursor-pointer w-[26px] h-[20px]"
              />
            </Link>

            <div className="flex-grow flex justify-center">
              <p className="text-gray-400 text-[18px] font-semibold text-center">
                Cart
              </p>
            </div>
          </div>
        </nav>

        <div>payment</div>

      </motion.div>
    </section>
  );
};

export default Payment;
