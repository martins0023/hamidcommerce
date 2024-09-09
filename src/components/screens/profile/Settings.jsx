import React from "react";
import MyButton from "../../reusable/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../styles";
import { back_icon } from "../../../assets";

const Settings = () => {
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
                Settings
              </p>
            </div>
          </div>
        </nav>

        <div className="p-7">
          <Link to="" className="text-[#242121] text-[14px] font-normal">Notifications</Link>
          <hr className="h-2  m-2" />
          <Link to="/changeemail" className="text-[#242121] text-[14px] font-normal">Email Settings</Link>
          <hr className="h-2  m-2" />
          <Link to="/accountsettings" className="text-[#242121] text-[14px] font-normal">Account Settings</Link>
          <hr className="h-2  m-2" />
          <Link to="/address" className="text-[#242121] text-[14px] font-normal">Manage Addresses</Link>
          <hr className="h-2  m-2" />
          <Link to="/payments" className="text-[#242121] text-[14px] font-normal">Manage Payments</Link>
          <hr className="h-2  m-2" />
          <Link to="/logout" className="text-[#242121] text-[14px] font-normal">Logout</Link>
          <hr className="h-2  m-2" />
        </div>

      </motion.div>
    </section>
  );
};

export default Settings;
