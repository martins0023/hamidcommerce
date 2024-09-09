import React from "react";
import MyButton from "../../reusable/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../styles";
import { back_icon } from "../../../assets";

const ChangePassword = () => {
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
    <section className="bg-[#FFFFFF]">
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
                Change Password
              </p>
            </div>
          </div>
        </nav>

        <div className="pb-10">
          <div className="bg-[#E9F1FD]">
            <div className="flex p-8 flex-col pt-5 pb-5">
              <div className="flex flex-col">
                <p className="text-black font-medium text-[14px]">
                  Use this form to change your password.
                </p>
                <p className="text-[#00000070] text-[14px] font-normal">
                  Enter your old password for authorization.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] justify justify-between p-3">
          <form className=" flex flex-col gap-[20px] m-2">
            <label className="flex flex-col">
              <span className="text-black font-medium ">Old Password</span>
              <input
                type="password"
                placeholder="Old Password"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                      rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-black font-medium ">New Password</span>
              <input
                type="password"
                placeholder="Enter New Password"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                      rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-black font-medium ">Confirm New Password</span>
              <input
                type="password"
                placeholder="Confirm New Password"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                      rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>

            <MyButton buttonText="Save Changes" />
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ChangePassword;
