import React from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Explore from "./Explore";
import MostPopular from "./MostPopular";
import MostTrending from "./MostTrending";
import { flyer2, flyer3 } from "../../assets";
import TrendingMen from "./TrendingMen";
import TopStores from "./TopStores";
import TrendingNow from "./TrendingNow";
import BottomNavbar from "./BottomNavbar";

const Dashboard = () => {
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
      <motion.div className="pb-24" variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
        <Navbar />
        <Hero />
        <Explore />
        <MostPopular />
        <MostTrending />
        <div className="mt-3">
          <img src={flyer2} className="w-full h-full" />
        </div>
        <TrendingMen />
        <div className="mt-3">
          <img src={flyer3} className="w-full h-full" />
        </div>
        <TopStores />
        <TrendingNow />
      </motion.div>
      <BottomNavbar />
    </section>
  );
};

export default Dashboard;
