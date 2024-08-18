import React from "react";
import { motion } from "framer-motion";
import Categories from "./Categories";
import MostPopular from "./MostPopular";
import TrendingNow from "./TrendingNow";
import TopStores from "./TopStores";
import BestBrand from "./BestBrand";
import BottomNavbar from "../../dashboard/BottomNavbar";
import { Link, useNavigate } from "react-router-dom";
import { Flyer7, back_icon, flyer1, flyer5, flyer6 } from "../../../assets";
import { styles } from "../../../styles";

const Men = () => {
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
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20 bg-white`}
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

            {/* This div takes up the remaining space and centers the text */}
            <div className="flex-grow flex justify-center">
              <p className="text-gray-400 text-[14px] text-center">
                Men Fashion
              </p>
            </div>
          </div>
        </nav>

        <div className="pb-24">
          <div className="mt-5">
            <img src={Flyer7} className="w-full h-auto" />
          </div>
          <Categories />
          <MostPopular />
          <div className="mt-5">
            <img src={flyer5} className="w-full h-auto" />
          </div>
          <TrendingNow />
          <div className="mt-5">
            <img src={flyer1} className="w-full h-auto" />
          </div>
          <TopStores />
          <BestBrand />
        </div>
      </motion.div>
      <BottomNavbar />
    </section>
  );
};

export default Men;
